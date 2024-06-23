import { modeofoperation, numberofdigitsfrom, numberofdigitsto, numberofrows } from "@/store/selectors";
import store from "@/store/store";

export const generateRandomNumber = (min, max) => {
  let number;
  do {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (number === 0); 
  return number;
};

export const generateNumberWithDigits = (digits) => {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return generateRandomNumber(min, max);
};

export const getModeOfOperation = () => {
  const state = store.getState();
  return modeofoperation(state);
};

export const getNumberOfDigitsFrom = () => {
  const state = store.getState();
  return numberofdigitsfrom(state);
};

export const getNumberOfDigitsTo = () => {
  const state = store.getState();
  return numberofdigitsto(state);
};

export const getNumberOfRows = () => {
  const state = store.getState();
  return numberofrows(state);
};

export const generateNumbers = () => {
  const numbers = [];
  let sum = 0;
  const modeofoperation = getModeOfOperation();
  const numberofdigitsfrom = getNumberOfDigitsFrom();
  const numberofdigitsto = getNumberOfDigitsTo();
  const numberofrows = getNumberOfRows();

  for (let i = 0; i < numberofrows; i++) {
    let number;

    if (modeofoperation === 'Subtraction') {
      let firstNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto));
      let secondNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto));

      if (secondNumber > firstNumber) {
        [firstNumber, secondNumber] = [secondNumber, firstNumber]; // Swap to ensure the result is positive
      }
      number = `${firstNumber} - ${secondNumber}`;
    } else if (modeofoperation === 'Multiplication' || modeofoperation === 'Division') {
      let firstNumber;
      let secondNumber;

      if (modeofoperation === 'Division') {
        firstNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto));
        do {
          secondNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto));
        } while (firstNumber % secondNumber !== 0);  // Ensure firstNumber is divisible by secondNumber
        number = `${firstNumber} / ${secondNumber}`;
      } else {
        firstNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto));
        secondNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto));
        number = `${firstNumber} * ${secondNumber}`;
      }
    } else if (modeofoperation === 'Addition') {
      number = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto)).toString();
    } else {
      const min = Math.pow(10, numberofdigitsfrom - 1);
      const max = Math.pow(10, numberofdigitsto) - 1;
      number = generateRandomNumber(min, max).toString();
      sum += parseInt(number);
    }

    numbers.push(number);
  }

  if (sum < 0 && modeofoperation !== 'Addition') {
    const adjustment = Math.abs(sum) + generateRandomNumber(1, 10);
    numbers[numberofrows - 1] = (parseInt(numbers[numberofrows - 1]) + adjustment).toString();
  }

  return numbers;
};
export const generateMultipleNumbers = (mode) => {
  if (mode === 2) {
      return [generateNumbers(), generateNumbers()];
  } else if (mode === 3) {
      return [generateNumbers(), generateNumbers(), generateNumbers()];
  }
  return [];
};
