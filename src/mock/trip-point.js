import dayjs from "dayjs";
import {typeDescriptions, destinations, pointDescription, prices, offers, photos, getRandomInteger, getRandomLengthArray} from "../util.js";

/**
 * возвращает одно случайное значение из массива значений
 * @param {Object} array - исходный массив
 * @return {*} - случайное значение
 */
const genereteRandomValue = (array) => {
  return array[getRandomInteger(array.length - 1)];
};

/**
 * формирует случайную дату на основе текущей даты
 * @param {String} key - ключ для формирования объекта даты в прошлом либо в будущем
 * @return {Object} - случайная дата
 */
const generateDate = (key = `startDateTime`) => {
  let maxRange = -23;
  if (key === `endDateTime`) {
    maxRange = 23;
  }
  const randomValue = getRandomInteger(maxRange);

  return dayjs().add(randomValue, `hour`);
};

/**
 * формирует тестовые данные для отрисовки точки маршрута
 * @return {Object} - тестовые данные
 */
const generateTripPoint = () => {
  return {
    type: genereteRandomValue(typeDescriptions),
    destination: genereteRandomValue(destinations),
    startDateTime: generateDate(),
    endDateTime: generateDate(`endDateTime`),
    price: getRandomInteger(prices[0], prices[1]),
    offers: getRandomLengthArray(offers),
    destinationInfo: {
      description: getRandomLengthArray(pointDescription).join(` `),
      photos: getRandomLengthArray(photos),
    }
  };
};

/**
 * формирует тестовые данные для отрисовки точки маршрута
 * @return {Object} - тестовые данные
 */
const generateNewAndEditTripPoint = () => {
  return {
    type: genereteRandomValue(typeDescriptions),
    destination: genereteRandomValue(destinations),
    startDateTime: generateDate(),
    endDateTime: generateDate(`endDateTime`),
    price: getRandomInteger(prices[0], prices[1]),
    offers: getRandomLengthArray(offers),
    destinationInfo: {
      description: getRandomLengthArray(pointDescription).join(` `),
      photos: getRandomLengthArray(photos),
    }
  };
};

export {generateTripPoint, generateNewAndEditTripPoint};
