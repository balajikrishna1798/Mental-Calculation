import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/store";
import { speakText } from "../utils/speech";
import DisplayNumbers from "./DisplayNumbers";
import Stopwatch from "./Stopwatch";

const NumberGenerator = ({
  result,
  setResult,
  setShowResult,
  currentRow,
  setCurrentRow,
  generatedNumbers,
  isPlaying,
  isResult,
}) => {
  const { modeofoperation, isHandsFree, language, mode, numberofrows } = useAppSelector(
    (state) => state.mental
  );
  const [userAnswers, setUserAnswers] = useState(["", "", ""]);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const isLastRow = () => {
    return currentRow === numberofrows - 1;
  };

  useEffect(() => {
    const proceedToNext = async () => {
      if (currentRow === -1) {
        setCurrentRow(0);
        await speakNumbers(0);
      } else if (currentRow < numberofrows - 1) {
        await speakText(generatedNumbers[currentRow + 1], language);
        setCurrentRow(currentRow + 1);
      }
      setIsSpeaking(false);
    };

    if (isHandsFree && isPlaying && !isSpeaking) {
      setIsSpeaking(true);
      proceedToNext();
    }
  }, [isHandsFree, isPlaying, currentRow, generatedNumbers, language, numberofrows]);

  const speakNumbers = async (row) => {
    for (let i = 0; i < mode; i++) {
      await speakText(generatedNumbers[i][row], language);
    }
  };

  const handleNext = async () => {
    setIsNextDisabled(true);
    if (generatedNumbers[currentRow]) {
      if (currentRow < numberofrows - 1) {
        setCurrentRow(currentRow + 1);
        await speakText(generatedNumbers[currentRow + 1], language);
      }
    }
    setIsNextDisabled(false);
  };

  const handleMultiAdditionCheck = () => {
    if ((mode === 2 || mode === 3) && modeofoperation === "Addition") {
      const correctAnswers = generatedNumbers.map((numbers) =>
        numbers.reduce((acc, num) => acc + parseInt(num), 0)
      );

      const isCorrect = userAnswers
        .slice(0, mode)
        .every((answer, index) => parseInt(answer) === correctAnswers[index]);
      setIsAnswerCorrect(isCorrect);

      const resultStrings = correctAnswers.map(
        (correctAnswer, index) =>
          `Answer ${index + 1}: ${
            parseInt(userAnswers[index]) === correctAnswer
              ? "Correct"
              : "Incorrect"
          } (${correctAnswer})`
      );

      setResult(resultStrings);
      setShowResult(true);
    }
  };

  return (
    <div>
      <Stopwatch isPlaying={isPlaying} isResult={isResult} />

      {mode === 1 ? (
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
            isPlaying &&
            modeofoperation !== "Multiplication" &&
            modeofoperation !== "Division" && (
              <div className="mt-5 flex justify-center space-x-4">
                {!isLastRow() && (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-green-800 text-white rounded"
                    disabled={isNextDisabled}
                  >
                    Next
                  </button>
                )}
              </div>
            )}
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {generatedNumbers.slice(0, mode).map((numbers, windowIndex) => (
              <div key={windowIndex}>
                {numbers.slice(currentRow, currentRow + 1).map((num, index) => (
                  <div
                    key={index}
                    className="flex justify-center font-bold text-5xl md:text-8xl lg:text-8xl text-white min-screen"
                  >
                    <DisplayNumbers>{num}l</DisplayNumbers>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {!isHandsFree && isPlaying && modeofoperation === "Addition" && (
            <div className="mt-5 flex justify-center space-x-4">
              {userAnswers.slice(0, mode).map((answer, index) => (
                <input
                  key={index}
                  type="text"
                  value={answer}
                  onChange={(e) =>
                    setUserAnswers((prev) => {
                      const newAnswers = [...prev];
                      newAnswers[index] = e.target.value;
                      return newAnswers;
                    })
                  }
                  className="p-2 border rounded"
                  placeholder={`Answer ${index + 1}`}
                />
              ))}
              <button
                onClick={handleMultiAdditionCheck}
                className="ml-2 p-2 bg-gray-200 rounded"
                disabled={userAnswers.slice(0, mode).some((answer) => !answer)}
              >
                Check Answer
              </button>
            </div>
          )}
          {!isHandsFree && isPlaying && (
            <div className="mt-5 flex justify-center space-x-4">
              <button onClick={handleNext} className="p-2 bg-red-600 rounded" disabled={isNextDisabled}>
                Next
              </button>
            </div>
          )}
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

      {/* Display results in a grid for subtraction */}
      { modeofoperation === "Subtraction" && result && (
        <div className="result-grid">
          {result.map((res, index) => (
            <div key={index} className="result-item">
              {res}
            </div>
          ))}
        </div>
      )}

      {/* Display result for addition */}
      { modeofoperation === "Addition" && result && (
        <div className="flex justify-center font-bold text-5xl md:text-8xl lg:text-8xl text-white">
          <DisplayNumbers>{result}</DisplayNumbers>
        </div>
      )}
    </div>
  );
};

export default NumberGenerator;
