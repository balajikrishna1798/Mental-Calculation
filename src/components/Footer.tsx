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
  setIsResult,
  setTime,
  setStopWatchRun,
  setUserAnswers,
}) => {
  const { modeofoperation, language, mode, isHandsFree } = useAppSelector(
    (state) => state.mental
  );

  useEffect(() => {
    if (isPlaying) {
      setShowResult(false);
      setResult(null);
    }
  }, [isPlaying, setShowResult, setResult]);

  const handleResult = async () => {
    setIsPlaying(false);
    setIsResult(true);
    const results = [];
    const operations = [];

    if (modeofoperation === "Subtraction") {
      for (let i = 0; i < generatedNumbers.length; i++) {
        const number = generatedNumbers[i];
        const [firstNumber, secondNumber] = number.split(" - ").map(Number);
        const resultValue = firstNumber - secondNumber;
        const resultString = `${firstNumber} - ${secondNumber} = ${resultValue}`;

        results.push(resultString);
        operations.push(resultString.replace(/-/g, " minus "));
      }
    } else if (
      modeofoperation === "Addition" ||
      modeofoperation === "Addition and Subtraction"
    ) {
      if (mode === 1) {
        const additionResult = generatedNumbers.reduce(
          (acc, num) => acc + parseInt(num),
          0
        );
        const resultString = `Result: ${additionResult}`;
        results.push(resultString);
        operations.push(resultString);
      } else {
        for (let i = 0; i < mode; i++) {
          const additionResult = generatedNumbers[i].reduce(
            (acc, num) => acc + parseInt(num),
            0
          );
          const resultString = `Window ${i + 1} Result: ${additionResult}`;
          results.push(resultString);
          operations.push(resultString);
        }
      }
    } else if (modeofoperation === "Multiplication" || modeofoperation === "Division") {
      for (let i = 0; i < generatedNumbers.length; i++) {
        const number = generatedNumbers[i];
        let resultValue;
        let resultString;
        if (modeofoperation === "Multiplication") {
          const [firstNumber, secondNumber] = number.split(" * ").map(Number);
          resultValue = firstNumber * secondNumber;
          resultString = `${firstNumber} * ${secondNumber} = ${resultValue}`;
        } else if (modeofoperation === "Division") {
          const [firstNumber, secondNumber] = number.split(" / ").map(Number);
          resultValue = firstNumber / secondNumber;
          resultString = `${firstNumber} / ${secondNumber} = ${resultValue}`;
        }
        results.push(resultString);
        operations.push(resultString.replace(/\*/g, " multiplied by ").replace(/\//g, " divided by "));
      }
    }

    setResult(results);
    setShowResult(true);

    // Speak all results at once
    for (const operation of operations) {
      await speakText(operation, language);
    }

    // Wait for 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setShowResult(false);
  };

  const isLastRow = () => {
    if (mode === 1) {
      return currentRow === generatedNumbers.length - 1;
    } else {
      return currentRow === generatedNumbers[0].length - 1;
    }
  };

  return (
    <footer className="fixed w-full bottom-0 py-5 flex flex-row justify-center items-center shadow-2xl">
      <div className="w-full bottom-0 py-5 flex flex-row justify-center items-center min_footer">
        <div className="flex flex-row justify-center items-center bg-black bg-opacity-30 rounded-lg lg:p-5 min_footer">
          <button
            onClick={togglePopup}
            className="text-white px-10 py-2 rounded-full font-bold settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95-2.75 4.75-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5"
              />
            </svg>
          </button>
          <div>
            <button
              onClick={() => {
                setIsPlaying(true);
                setShowResult(false);
                setIsResult(false);
                speakOrStop();
                setTime(0);
                setStopWatchRun(false);
                setUserAnswers(["", "", ""]);
              }}
              className="text-white px-10 py-2 rounded-full font-bold play-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                viewBox="0 0 20 20"
              >
                <path
                  fill="white"
                  d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07m12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32M7 6l8 4-8 4z"
                />
              </svg>
            </button>
          </div>
          <div>
            {isPlaying && isLastRow() && isHandsFree && (
              <button
                onClick={handleResult}
                className="text-white px-10 py-2 rounded-full font-bold result-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2rem"
                  height="2rem"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="m9 20.42l-6.21-6.21 2.83-2.83L9 14.77l9.88-9.89 2.83 2.83z"
                  />
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
