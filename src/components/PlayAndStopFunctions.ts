// File path: utils/checkAnswer.ts
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
      const [firstNumber, operator, secondNumber] = number.split(" ");
      let resultValue;
      if (operator === "*") {
        resultValue = Number(firstNumber) * Number(secondNumber);
      } else if (operator === "/") {
        resultValue = Number(firstNumber) / Number(secondNumber);
      }
      correctAnswer = resultValue.toString();
    } else if (modeofoperation === 'Addition and Subtraction') {
      const [firstNumber, operator, secondNumber] = number.split(" ");
      let resultValue;
      if (operator === "+") {
        resultValue = Number(firstNumber) + Number(secondNumber);
      } else if (operator === "-") {
        resultValue = Number(firstNumber) - Number(secondNumber);
      }
      correctAnswer = resultValue.toString();
    } else {
      correctAnswer = generatedNumbers.reduce((acc, num) => acc + parseInt(num), 0).toString();
    }

    handleAnswerCheck(userAnswer === correctAnswer, `${number} = ${correctAnswer}`);

    if (userAnswer === correctAnswer) {
      if (modeofoperation === 'Multiplication' || modeofoperation === 'Division') {
        handleNextQuestion();
      } else {
        handleNext();
      }
    }
  } else {
    console.error("Generated number is undefined");
  }
};
