import dayjs from "dayjs";
import {typeDescriptions, getRandomInteger, getRandomLengthArray, genereteRandomValue} from "../util.js";

const destinations = [
  `Rome`,
  `Reykjavik`,
  `Ulan Bator`,
  `Madrid`,
  `New York`,
  `Paris`,
  `Moscow`,
  `Tokio`,
  `London`
];

const pointDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
];

const Prices = {
  min: 20,
  max: 170
};

const offers = [
  {
    type: `luggage`,
    option: `Add luggage`,
    price: getRandomInteger(Prices.min)
  },
  {
    type: `comfort`,
    option: `Switch to comfort`,
    price: getRandomInteger(Prices.min)
  },
  {
    type: `meal`,
    option: `Add meal`,
    price: getRandomInteger(Prices.min)
  },
  {
    type: `seats`,
    option: `Choose seats`,
    price: getRandomInteger(Prices.min)
  },
  {
    type: `train`,
    option: `Travel by train`,
    price: getRandomInteger(Prices.min)
  }
];

const photos = [
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`,
  `http://picsum.photos/248/152?r=${Math.random()}`
];

const TimeRange = {
  past: -23,
  future: 23
};

/**
 * формирует случайную дату на основе текущей даты
 * @param {Number} timeValue - время в прошлом либо в будущем
 * @return {Object} - случайная дата
 */
const generateDate = (timeValue) => {
  const randomValue = getRandomInteger(timeValue);

  return dayjs().add(randomValue, `hour`);
};

/**
 * формирует тестовые данные для отрисовки формы создания и редактирования точки маршрута
 * @return {Object} - тестовые данные
 */
const generateUniversalTripPoint = () => {
  return {
    type: genereteRandomValue(typeDescriptions),
    destination: genereteRandomValue(destinations),
    startDateTime: generateDate(TimeRange.past),
    endDateTime: generateDate(TimeRange.future),
    price: getRandomInteger(Prices.min, Prices.max),
    offers: getRandomLengthArray(offers),
    destinationInfo: {
      description: getRandomLengthArray(pointDescription).join(` `),
      photos: getRandomLengthArray(photos),
    }
  };
};

export {
  typeDescriptions,
  generateUniversalTripPoint
};
