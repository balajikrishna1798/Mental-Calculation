import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { speakText } from "../utils/speech";
import DisplayNumbers from "./DisplayNumbers";
import Stopwatch from "./Stopwatch";
import { setInputColors } from "@/features/MentalSlice";

const NumberGenerator = ({
  result,
  setResult,
  showResult,
  setShowResult,
  currentRow,
  setCurrentRow,
  generatedNumbers,
  isPlaying,
  isResult,
  setTime,
  time,
  setIsAnswerCorrect,
  isAnswerCorrect,
  stopwatchrun,
  setStopWatchRun,
  userAnswers,
  setUserAnswers,
}) => {
  const {
    modeofoperation,
    isHandsFree,
    language,
    mode,
    numberofrows,
    timeOutMs,
    inputColors
  } = useAppSelector((state) => state.mental);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const timeoutId = useRef(null);
  const dispatch = useAppDispatch()
console.log(inputColors,"in");

  const isLastRow = () => currentRow === numberofrows - 1;

  const speakNumbers = async (row) => {
    setIsSpeaking(true);
    if (mode === 1) {
      await speakText(generatedNumbers[row], language);
    } else {
      for (let i = 0; i < mode; i++) {
        await speakText(generatedNumbers[i][row], language);
      }
    }
    setIsSpeaking(false);
  };

  const proceedToNext = async () => {
    if (!isLastRow()) {
      const nextRow = currentRow + 1;
      await speakNumbers(nextRow);
      setCurrentRow(nextRow);
    }
  };

  useEffect(() => {
    if (isHandsFree && isPlaying && !isSpeaking && currentRow < numberofrows) {
      timeoutId.current = setTimeout(() => {
        proceedToNext();
      }, timeOutMs); // 10 seconds delay
    }
    return () => clearTimeout(timeoutId.current);
  }, [
    isHandsFree,
    isPlaying,
    isSpeaking,
    currentRow,
    generatedNumbers,
    language,
    numberofrows,
  ]);

  useEffect(() => {
    if (generatedNumbers.length !== userAnswers.length) {
      setUserAnswers(new Array(generatedNumbers.length).fill(""));
    }
  }, [generatedNumbers]);

  const handleNext = async () => {
    setIsNextDisabled(true);
    if (generatedNumbers[currentRow] && currentRow < numberofrows - 1) {
      await speakNumbers(currentRow + 1);
      setCurrentRow(currentRow + 1);
    }
    setIsNextDisabled(false);
  };

  const handleCheckAnswer = () => {
    let correctAnswers = [];
    let colors = [];

    if (mode === 1) {
      if (modeofoperation === "Subtraction") {
        correctAnswers = generatedNumbers.map((num) => {
          const [firstNumber, secondNumber] = num.split(" - ").map(Number);
          const result = firstNumber - secondNumber;
          return result;
        });
      } else if (modeofoperation === "Multiplication") {
        correctAnswers = generatedNumbers.map((num) => {
          const [firstNumber, secondNumber] = num.split(" * ").map(Number);
          const result = firstNumber * secondNumber;
          return result;
        });
      } else if (modeofoperation === "Division") {
        correctAnswers = generatedNumbers.map((num) => {
          const [firstNumber, secondNumber] = num.split(" / ").map(Number);
          const result = firstNumber / secondNumber;
          return result;
        });
      } else if (
        modeofoperation === "Addition" ||
        modeofoperation === "Addition and Subtraction"
      ) {
        correctAnswers = [
          generatedNumbers.reduce((acc, num) => acc + parseInt(num), 0),
        ];
      }
    } else {
      correctAnswers = generatedNumbers.map((numbers) =>
        numbers.reduce((acc, num) => {
          if (
            modeofoperation === "Multiplication" ||
            modeofoperation === "Division"
          ) {
            const [firstNumber, operator, secondNumber] = num.split(" ");
            let result;
            if (operator === "*") {
              result = parseInt(firstNumber) * parseInt(secondNumber);
            } else if (operator === "/") {
              result = parseInt(firstNumber) / parseInt(secondNumber);
            }
            return acc + result;
          } else {
            return acc + parseInt(num);
          }
        }, 0)
      );
    }

    const newInputColors = userAnswers.map((answer, index) =>
      parseInt(answer) === correctAnswers[index]
        ? "border-2 border-green-500"
        : "border-2 border-red-500"
    );

    dispatch(setInputColors(newInputColors));

    const isCorrect = newInputColors.every(
      (color) => color === "border-2 border-green-500"
    );

    setIsAnswerCorrect(isCorrect);
    setResult(
      correctAnswers.map(
        (correctAnswer, index) => `Correct Answer: ${correctAnswer}`
      )
    );
    setShowResult(true);
    setStopWatchRun(true);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <Stopwatch
        isPlaying={isPlaying}
        isResult={isResult}
        setTime={setTime}
        time={time}
        stopwatchrun={stopwatchrun}
      />

      <div className="mt-10 w-full">
        {mode === 1 &&
        ["Subtraction", "Multiplication", "Division"].includes(
          modeofoperation
        ) ? (
          <div>
            <div>
              {!result &&
                generatedNumbers
                  .slice(currentRow, currentRow + 1)
                  .map((num, index) => (
                    <div
                      key={index}
                      className="flex justify-center font-bold text-5xl md:text-8xl lg:text-8xl text-white min-screen"
                    >
                      <DisplayNumbers>{num}</DisplayNumbers>
                    </div>
                  ))}
            </div>

            {!isHandsFree &&
              isPlaying && (
                <div className="mt-5 flex justify-center space-x-4">
                  {!isLastRow() ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-500"
                      disabled={isNextDisabled}
                    >
                      Next
                    </button>
                  ) : (
                    <div className="mt-5 flex flex-col gap-5 items-center">
                      <div className="flex gap-5">
                        {generatedNumbers.map((_, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <input
                              type="text"
                              value={userAnswers[index]}
                              onChange={(e) => {
                                const newAnswers = [...userAnswers];
                                newAnswers[index] = e.target.value;
                                setUserAnswers(newAnswers);
                              }}
                              className={`p-2 border rounded ${inputColors[index] || ""}`}
                              placeholder={`Answer ${index + 1}`}
                            />
                            {result && (
                              <div className="mt-2 text-lg text-[cornsilk] font-bold">
                                {result[index]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={handleCheckAnswer}
                        className="mt-2 p-2 bg-blue-700 rounded text-white cursor-pointer hover:bg-blue-600"
                        disabled={
                          !userAnswers.every(
                            (item) =>
                              typeof item === "string" && item.trim() !== ""
                          )
                        }
                      >
                        Check Answers
                      </button>
                    </div>
                  )}
                </div>
              )}
          </div>
        ) : (
          <div>
            <div className="flex justify-around">
              {Array.isArray(generatedNumbers) &&
              generatedNumbers.length &&
              generatedNumbers[0].map ? (
                generatedNumbers.map((numbers, windowIndex) => (
                  <div key={windowIndex}>
                    {numbers.slice(currentRow, currentRow + 1).map((num, index) => (
                      <div
                        key={index}
                        className="flex justify-center font-bold text-5xl md:text-8xl lg:text-8xl text-white min-screen"
                      >
                        <DisplayNumbers>{num}</DisplayNumbers>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div>
                  {!result &&
                    generatedNumbers
                      .slice(currentRow, currentRow + 1)
                      .map((num, index) => (
                        <div
                          key={index}
                          className="flex justify-center font-bold text-5xl md:text-8xl lg:text-8xl text-white min-screen"
                        >
                          <DisplayNumbers>{num}</DisplayNumbers>
                        </div>
                      ))}
                </div>
              )}
            </div>

            {!isHandsFree &&
              isPlaying &&
              (modeofoperation === "Addition" ||
                modeofoperation === "Addition and Subtraction") &&
              isLastRow() && mode === 1 && (
                <div className="mt-5 flex flex-col items-center space-y-4">
                  <input
                    type="text"
                    value={userAnswers[0]}
                    onChange={(e) => setUserAnswers([e.target.value])}
                    className={`p-2 border rounded ${inputColors[0] || ""}`}
                    placeholder="Answer"
                  />
                  {result && (
                    <div className="mt-2 text-lg text-[cornsilk]">
                      {result[0]}
                    </div>
                  )}
                  <button
                    onClick={handleCheckAnswer}
                    className="mt-2 p-2 text-white bg-green-700 rounded hover:bg-green-600"
                    disabled={
                      !userAnswers.every(
                        (item) => typeof item === "string" && item.trim() !== ""
                      )
                    }
                  >
                    Check Answer
                  </button>
                </div>
              )}

            {!isHandsFree &&
              isPlaying &&
              (modeofoperation === "Addition" ||
                modeofoperation === "Addition and Subtraction") &&
              isLastRow() && mode > 1 && (
                <div className="mt-5 flex flex-col gap-5 items-center">
                  <div className="flex gap-5">
                    {generatedNumbers.map((_, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <input
                          type="text"
                          value={userAnswers[index]}
                          onChange={(e) => {
                            const newAnswers = [...userAnswers];
                            newAnswers[index] = e.target.value;
                            setUserAnswers(newAnswers);
                          }}
                          className={`p-2 border rounded ${inputColors[index] || ""}`}
                          placeholder={`Answer ${index + 1}`}
                        />
                        {result && (
                          <div className="mt-2 text-lg text-[cornsilk]">
                            {result[index]}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleCheckAnswer}
                    className="mt-2 p-2 text-white bg-green-700 rounded hover:bg-green-600"
                    disabled={
                      !userAnswers.every(
                        (item) => typeof item === "string" && item.trim() !== ""
                      )
                    }
                  >
                    Check Answers
                  </button>
                </div>
              )}

            {!isLastRow() &&
              !isHandsFree &&
              isPlaying && (
                <div className="mt-5 flex justify-center space-x-4">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                    disabled={isNextDisabled}
                  >
                    Next
                  </button>
                </div>
              )}
          </div>
        )}
      </div>
      {/* Display result if showResult is true */}
      {showResult && result && isHandsFree && (
        <div className="mt-5 flex flex-col items-center space-y-4">
          {result.map((res, index) => (
            <div key={index} className="text-lg text-[cornsilk]">
              {res}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NumberGenerator;
