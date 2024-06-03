import React, { useEffect } from "react";
import { useAppSelector } from "@/store/store";
import { speakText } from "../utils/speech";

const Footer = ({
  togglePopup,
  generatedNumbers,
  result,
  setResult,
  speakOrStop,
  showResult,
  setShowResult,
  currentRow,
  setCurrentRow,
  setIsPlaying,
  isPlaying,
}) => {
  const { modeofoperation, language, mode } = useAppSelector((state) => state.mental);

  useEffect(() => {
    if (isPlaying) {
      setShowResult(false);
      setResult(null);
    }
  }, [isPlaying, setShowResult, setResult]);

  const handleResult = () => {
    if (mode > 1) {
      if (modeofoperation === "Multiplication" || modeofoperation === "Division") {
        const results = generatedNumbers.map((windowNumbers) => {
          return windowNumbers.map((num) => {
            const [firstNumber, secondNumber] = num.split(/ \* | \/ /).map(Number);
            let resultValue;
            if (modeofoperation === "Multiplication") {
              resultValue = firstNumber * secondNumber;
            } else if (modeofoperation === "Division") {
              resultValue = firstNumber / secondNumber;
            }
            return `${firstNumber} ${modeofoperation === "Multiplication" ? "*" : "/"} ${secondNumber} = ${resultValue}`;
          }).join('\n');
        });

        setResult(results);
        setShowResult(true);
      } else {
        const results = generatedNumbers.map((windowNumbers) => {
          const additionResult = windowNumbers.reduce((acc, num) => acc + parseInt(num), 0);
          return `Result: ${additionResult}`;
        });
        setResult(results);
        setShowResult(true);
      }
    } else {
      if (generatedNumbers[currentRow]) {
        const number = generatedNumbers[currentRow];
        if (modeofoperation === "Multiplication" || modeofoperation === "Division") {
          const [firstNumber, secondNumber] = number.split(/ \* | \/ /).map(Number);
          let resultValue;
          if (modeofoperation === "Multiplication") {
            resultValue = firstNumber * secondNumber;
          } else if (modeofoperation === "Division") {
            resultValue = firstNumber / secondNumber;
          }
          const resultString = `${firstNumber} ${modeofoperation === "Multiplication" ? "*" : "/"} ${secondNumber} = ${resultValue}`;
          setResult(resultString);
          speakText(resultValue.toString(), language);
          setShowResult(true);
        } else {
          const additionResult = generatedNumbers.reduce((acc, num) => acc + parseInt(num), 0);
          const resultString = `Result: ${additionResult}`;
          setResult(resultString);
          speakText(additionResult.toString(), language);
          setShowResult(true);
        }
      }
    }
  };

  return (
    <footer className="fixed w-full bottom-0 py-5 flex flex-row justify-center items-center shadow-2xl">
      <div className="w-full bottom-0 py-5 flex flex-row justify-center items-center min_footer">
        <div className="flex flex-row justify-center items-center bg-black bg-opacity-30 rounded-lg lg:p-5 min_footer">
          <button onClick={togglePopup} className="text-white px-10 py-2 rounded-full font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
              <path fill="white" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5" />
            </svg>
          </button>
          <div>
            <button onClick={() => { setIsPlaying(true); speakOrStop(); }} className="text-white px-10 py-2 rounded-full font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 20 20">
                <path fill="white" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07m12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32M7 6l8 4-8 4z" />
              </svg>
            </button>
          </div>
          <div>
            {isPlaying && (
              <button onClick={handleResult} className="text-white px-10 py-2 rounded-full font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
                  <path fill="white" d="m9 20.42l-6.21-6.21 2.83-2.83L9 14.77l9.88-9.89 2.83 2.83z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
