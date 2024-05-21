import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { speakText } from "../utils/speech";
import DisplayNumbers from "./DisplayNumbers";
import { checkAnswer } from "./PlayAndStopFunctions";

const NumberGenerator = ({ result, setResult, setShowResult, currentRow, setCurrentRow, generatedNumbers }) => {
  const { modeofoperation, isHandsFree, language } = useAppSelector((state) => state.mental);

  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const handleAnswerCheck = (value, correctAnswer) => {
    setIsAnswerCorrect(value);
    if (!value) {
      setResult(correctAnswer);
    }
  };

  const handleNextQuestion = () => {
    if (currentRow < generatedNumbers.length - 1) {
      setCurrentRow(currentRow + 1);
      setShowResult(false);
      setResult(null);
      if (generatedNumbers[currentRow + 1]) {
        speakText(generatedNumbers[currentRow + 1], language);
      }
    }
  };

  useEffect(() => {
    if (isHandsFree && currentRow >= 0 && currentRow < generatedNumbers.length) {
      if (modeofoperation === "Multiplication" || modeofoperation === "Division") {
        setShowResult(true);
      } else {
        const timer = setTimeout(() => {
          if (currentRow < generatedNumbers.length - 1) {
            setCurrentRow(currentRow + 1);
            if (generatedNumbers[currentRow + 1]) {
              speakText(generatedNumbers[currentRow + 1], language);
            }
          } else {
            setShowResult(true);
          }
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [isHandsFree, currentRow, generatedNumbers, language, modeofoperation]);

  const handleNext = () => {
    if (currentRow < generatedNumbers.length - 1) {
      setCurrentRow(currentRow + 1);
      if (generatedNumbers[currentRow + 1]) {
        speakText(generatedNumbers[currentRow + 1], language);
      }
    }

    if (currentRow === generatedNumbers.length - 2 && modeofoperation !== "Multiplication" && modeofoperation !== "Division") {
      setShowResult(true);
    }
  };

  const handleResult = () => {
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
        setResult(`${firstNumber} ${modeofoperation === "Multiplication" ? "*" : "/"} ${secondNumber} = ${resultValue}`);
        speakText(resultValue.toString(), language);

        return `${firstNumber} ${modeofoperation === "Multiplication" ? "*" : "/"} ${secondNumber} = ${resultValue}`;
      } else {
        const additionResult = generatedNumbers.reduce((acc, num) => acc + parseInt(num), 0);
        setResult(`Result: ${additionResult}`);
        speakText(additionResult.toString(), language);
        setShowResult(false);
        return `Result: ${additionResult}`;
      }
    }
  };

  return (
    <div>
      <div>
        {!result && generatedNumbers.slice(currentRow, currentRow + 1).map((num, index) => (
          <div key={index} className="flex justify-center font-bold text-5xl md:text-8xl lg:text-8xl text-white min-screen">
            <DisplayNumbers>{num}</DisplayNumbers>
          </div>
        ))}
      </div>

      {result && <DisplayNumbers>{result}</DisplayNumbers>}

      {!isHandsFree && generatedNumbers.length > 0 && (
        <div className="mt-5 flex justify-center">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={() => {
              const correctAnswer = handleResult();
              checkAnswer(generatedNumbers, currentRow, userAnswer, (value, correctAnswer) => handleAnswerCheck(value, correctAnswer), handleNextQuestion, handleNext);
            }}
            className="ml-2 p-2 bg-gray-200 rounded"
          >
            Check Answer
          </button>
        </div>
      )}
      {isAnswerCorrect !== null && (
        <div className="mt-3 flex justify-center">
          {isAnswerCorrect ? (
            <span className="text-green-500">Correct!</span>
          ) : (
            <span className="text-red-500">Incorrect. Try again.</span>
          )}
        </div>
      )}
    </div>
  );
};

export default NumberGenerator;
