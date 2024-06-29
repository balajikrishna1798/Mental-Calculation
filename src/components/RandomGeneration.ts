import { modeofoperation, numberofdigitsfrom, numberofdigitsto, numberofrows } from "@/store/selectors";
import store from "@/store/store";

export const generateRandomNumber = (min, max) => {
  let number;
  do {
    number = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (number === 0); // Ensure the number is non-zero
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
  const modeofoperation = getModeOfOperation();
  const numberofdigitsfrom = getNumberOfDigitsFrom();
  const numberofdigitsto = getNumberOfDigitsTo();
  const numberofrows = getNumberOfRows();
  const minDigit = Math.pow(10, numberofdigitsfrom - 1);
  const maxDigit = Math.pow(10, numberofdigitsto) - 1;

  let sum = 0;
  let positiveCount = 0;
  let negativeCount = 0;

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
        firstNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsfrom));
        do {
          secondNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsto, numberofdigitsto));
        } while (firstNumber % secondNumber !== 0);  // Ensure firstNumber is divisible by secondNumber
        number = `${firstNumber} / ${secondNumber}`;
      } else {
        firstNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsfrom));
        secondNumber = generateNumberWithDigits(generateRandomNumber(numberofdigitsto, numberofdigitsto));
        number = `${firstNumber} * ${secondNumber}`;
      }
    } else if (modeofoperation === 'Addition') {
      number = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto)).toString();
    } else if (modeofoperation === 'Addition and Subtraction') {
      let firstNumber;
      if (i === 0) {
        // Ensure the first number is positive and within the digit range
        firstNumber = generateRandomNumber(minDigit, maxDigit);
        sum += firstNumber;
        numbers.push(firstNumber);
        positiveCount++;
      } else {
        // For subsequent numbers, randomly decide if the number is positive or negative
        let number = generateRandomNumber(minDigit, maxDigit);
        if (Math.random() < 0.5 && negativeCount < numberofrows / 2) {
          number = -number;
          negativeCount++;
        } else {
          positiveCount++;
        }
        sum += number;
        numbers.push(number);
      }

      // Ensure at least half are negative and the sum is positive at the end
      if (i === numberofrows - 1 && sum <= 0) {
        numbers[numbers.length - 1] += Math.abs(sum) + generateRandomNumber(1, 10);
        sum += Math.abs(sum) + generateRandomNumber(1, 10);
      }

      continue;
    } else {
      const min = Math.pow(10, numberofdigitsfrom - 1);
      const max = Math.pow(10, numberofdigitsto) - 1;
      number = generateRandomNumber(min, max).toString();
      sum += parseInt(number);
    }

    numbers.push(number);
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
