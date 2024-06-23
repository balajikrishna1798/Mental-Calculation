import { modeofoperation } from "@/store/selectors";
import store from "@/store/store";

export const getModeOfOperation = () => {
  const state = store.getState();
  return modeofoperation(state);
};

export const speakText = (text: string, language: string = "en"): Promise<void> => {
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    let utterance;

    if (language === "nb-NO") {
      const number = parseInt(text);
      const norwegianText = numberToNorwegian(number);
      utterance = new SpeechSynthesisUtterance(norwegianText);
      utterance.lang = "no-NO";
    } else {
      const textString = text.toString(); // Ensure text is a string
    const operationText = textString
      .replace(/\*/g, " multiplied by ")
      .replace(/\//g, " divided by ")
      .replace(/-/g, " minus ");

      utterance = new SpeechSynthesisUtterance(operationText);
      utterance.lang = "en-US";
    }

    utterance.onstart = () => {
      resolve();
    };

    synth.speak(utterance);
  });
};

const units = ["", "en", "to", "tre", "fire", "fem", "seks", "sju", "åtte", "ni"];
const teens = ["ti", "elleve", "tolv", "tretten", "fjorten", "femten", "seksten", "sytten", "atten", "nitten"];
const tens = ["", "", "tjue", "tretti", "førti", "femti", "seksti", "sytti", "åtti", "nitti"];

export const numberToNorwegian = (number: number): string => {
  if (number === 0) return "null";

  if (number < 10) return units[number];
  if (number < 20) return teens[number - 10];
  if (number < 100) return tens[Math.floor(number / 10)] + (number % 10 > 0 ? " " + units[number % 10] : "");

  if (number < 1000) {
    const hundreds = Math.floor(number / 100);
    const remainder = number % 100;
    return units[hundreds] + " hundre" + (remainder > 0 ? " og " + numberToNorwegian(remainder) : "");
  }

  if (number < 1000000) {
    const thousands = Math.floor(number / 1000);
    const remainder = number % 1000;
    return (thousands > 1 ? numberToNorwegian(thousands) + " " : "") + "tusen" + (remainder > 0 ? " " + numberToNorwegian(remainder) : "");
  }

  return "";
};
