import { modeofoperation } from "@/store/selectors";
import store from "@/store/store";

export const getModeOfOperation = () => {
  const state = store.getState();
  return modeofoperation(state);
};

export const checkAnswer = (generatedNumbers, currentRow, userAnswer, handleAnswerCheck, handleNextQuestion, handleNext) => {
  const modeofoperation = getModeOfOperation();

  if (generatedNumbers[currentRow]) {
    let correctAnswer;
    const number = generatedNumbers[currentRow];
    if (modeofoperation === 'Multiplication' || modeofoperation === 'Division') {
      const [firstNumber, secondNumber] = number.split(/ \* | \/ /).map(Number);
      let resultValue;
      if (modeofoperation === 'Multiplication') {
        resultValue = firstNumber * secondNumber;
      } else if (modeofoperation === 'Division') {
        resultValue = firstNumber / secondNumber;
      }
      correctAnswer = resultValue.toString();
      handleAnswerCheck(userAnswer === correctAnswer, `${firstNumber} ${modeofoperation === 'Multiplication' ? '*' : '/'} ${secondNumber} = ${correctAnswer}`);
    } else {
      const additionResult = generatedNumbers.reduce((acc, num) => acc + parseInt(num), 0);
      correctAnswer = additionResult.toString();
      handleAnswerCheck(userAnswer === correctAnswer, `Result: ${correctAnswer}`);
    }

    if (userAnswer === correctAnswer) {
      setTimeout(() => {
        if (modeofoperation === 'Multiplication' || modeofoperation === 'Division') {
          handleNextQuestion();
        } else {
          handleNext();
        }
      }, 2000);
    }
  } else {
    console.error("Generated number is undefined");
  }
};
