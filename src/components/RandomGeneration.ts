import { modeofoperation, numberofdigitsfrom, numberofdigitsto, numberofrows } from "@/store/selectors";
import store from "@/store/store";

export const generateRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  export const generateNumberWithDigits = (digits: number): number => {
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
  export const getNumberOfRows= () => {
    const state = store.getState();
    return numberofrows(state);
  };


  export const generateNumbers = () => {
    const numbers = [];
    let sum = 0;
    const modeofoperation = getModeOfOperation()
    const numberofdigitsfrom = getNumberOfDigitsFrom()
    const numberofdigitsto = getNumberOfDigitsTo()
    const numberofrows = getNumberOfRows()

    for (let i = 0; i < numberofrows; i++) {
      let number;
      if (modeofoperation === 'Multiplication' || modeofoperation === 'Division') {
        let firstNumber;
        let secondNumber;

        if (modeofoperation === 'Division') {
          firstNumber = generateNumberWithDigits(numberofdigitsfrom);
          const maxSecondNumber = Math.pow(10, numberofdigitsto) - 1;
          secondNumber = generateRandomNumber(1, maxSecondNumber);

          firstNumber = firstNumber - (firstNumber % secondNumber);
          number = `${firstNumber} / ${secondNumber}`;
        } else {
          firstNumber = generateNumberWithDigits(numberofdigitsfrom);
          secondNumber = generateNumberWithDigits(numberofdigitsto);
          number = `${firstNumber} * ${secondNumber}`;
        }
        numbers.push(number);
      } else {
        const min = Math.pow(10, numberofdigitsfrom - 1);
        const max = Math.pow(10, numberofdigitsto) - 1;
        if (modeofoperation === 'Addition') {
          number = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto));
        } else {
          if (i === 0) {
            number = generateNumberWithDigits(generateRandomNumber(numberofdigitsfrom, numberofdigitsto));
          } else {
            number = generateRandomNumber(-max, max);
            if (number === 0) number = 1;
          }
        }
        numbers.push(number.toString());
        sum += number;
      }
    }

    if (sum < 0 && modeofoperation !== 'Addition') {
      const adjustment = Math.abs(sum) + generateRandomNumber(1, 10);
      numbers[numberofrows - 1] = (parseInt(numbers[numberofrows - 1]) + adjustment).toString();
    }

    return numbers;
  };
