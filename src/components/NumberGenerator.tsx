import React, { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/store';
import { speakText } from '../utils/speech';
import DisplayNumbers from './DisplayNumbers';
import { generateNumbers } from './RandomGeneration';
import { checkAnswer } from './PlayAndStopFunctions';

const NumberGenerator: React.FC = () => {
  const { modeofoperation,isHandsFree,language } = useAppSelector((state) => state.mental);
  const [generatedNumbers, setGeneratedNumbers] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState(-1);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<number | string | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

const handleAnswerCheck = (value) => {
  setIsAnswerCorrect(value)
}

const speakOrStop = () => {
    const numbers = generateNumbers();
    setGeneratedNumbers(numbers);
    setCurrentRow(0);
    setShowResult(false);
    setResult(null);
    speakText(numbers[0], language);
  };

  const handleNextQuestion = () => {
    if (currentRow < generatedNumbers.length - 1) {
      setCurrentRow(currentRow + 1);
      setShowResult(false);
      setResult(null);
      speakText(generatedNumbers[currentRow + 1], language);
    }
  };

  useEffect(() => {
    if (isHandsFree && currentRow >= 0 && currentRow < generatedNumbers.length) {
      if (modeofoperation === 'Multiplication' || modeofoperation === 'Division') {
        setShowResult(true);
      } else {
        const timer = setTimeout(() => {
          if (currentRow < generatedNumbers.length - 1) {
            setCurrentRow(currentRow + 1);
            speakText(generatedNumbers[currentRow + 1], language);
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
      speakText(generatedNumbers[currentRow + 1], language);
    }

    if (currentRow === generatedNumbers.length - 2 && modeofoperation !== 'Multiplication' && modeofoperation !== 'Division') {
      setShowResult(true);
    }
  };

  const handleResult = () => {
    if (modeofoperation === 'Multiplication' || modeofoperation === 'Division') {
      const [firstNumber, secondNumber] = generatedNumbers[currentRow].split(/ \* | \/ /).map(Number);
      let resultValue;
      if (modeofoperation === 'Multiplication') {
        resultValue = firstNumber * secondNumber;
      } else if (modeofoperation === 'Division') {
        resultValue = firstNumber / secondNumber;
      }
      setResult(`${firstNumber} ${modeofoperation === 'Multiplication' ? '*' : '/'} ${secondNumber} = ${resultValue}`);
      speakText(resultValue.toString(), language);

      setTimeout(() => {
        if (currentRow < generatedNumbers.length - 1) {
          handleNextQuestion();
        }
      }, 2000); 
    } else {
      const additionResult = generatedNumbers.reduce((acc, num) => acc + parseInt(num), 0);
      setResult(`Result: ${additionResult}`);
      speakText(additionResult.toString(), language);
      setShowResult(false);
    }
  };

  return (
    <div>
      {!showResult && currentRow === -1 && (
        <button
          onClick={speakOrStop}
          className="text-white px-10 py-2 rounded-full font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 20 20">
            <path fill="white" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07m12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32M7 6l8 4l-8 4z" />
          </svg>
        </button>
      )}
      <div>
        {!result && generatedNumbers.slice(currentRow, currentRow + 1).map((num, index) => (
          <div key={index} className="flex justify-center font-bold text-5xl md:text-8xl lg:text-8xl text-white min-screen">
            <DisplayNumbers>{num}</DisplayNumbers>
          </div>
        ))}
      </div>

      {showResult && !result && (
        <div className="flex justify-center font-bold text-2xl md:text-5xl lg:text-2xl text-black min-screen">
          <button onClick={handleResult} className='bg-gray-200 p-3 rounded'>Result</button>
        </div>
      )}
      {result && <DisplayNumbers>{result}</DisplayNumbers>}
      {!isHandsFree && currentRow >= 0 && currentRow < generatedNumbers.length - 1 && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleNext}
            className="text-white px-10 py-2 rounded-full font-bold"
          >
            Next
          </button>
        </div>
      )}
      {!isHandsFree && (
        <div className="mt-5 flex justify-center">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={()=>checkAnswer(generatedNumbers,currentRow,userAnswer,handleAnswerCheck,handleNextQuestion,handleNext)}
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
