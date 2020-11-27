import dayjs from "dayjs";
import {getRandomInteger, getRandomLengthArray, genereteRandomValue} from "../util.js";

const typeDescriptions = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
  `check-in`,
  `sightseeing`,
  `restaurant`
];

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

const prices = [
  20,
  170
];

const offers = [
  {
    type: `luggage`,
    option: `Add luggage`,
    price: getRandomInteger(prices[0])
  },
  {
    type: `comfort`,
    option: `Switch to comfort`,
    price: getRandomInteger(prices[0])
  },
  {
    type: `meal`,
    option: `Add meal`,
    price: getRandomInteger(prices[0])
  },
  {
    type: `seats`,
    option: `Choose seats`,
    price: getRandomInteger(prices[0])
  },
  {
    type: `train`,
    option: `Travel by train`,
    price: getRandomInteger(prices[0])
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
 * формирует тестовые данные для отрисовки формы создания и редактирования точки маршрута
 * @return {Object} - тестовые данные
 */
const generateUniversalTripPoint = () => {
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

export {
  typeDescriptions,
  destinations,
  pointDescription,
  prices,
  offers,
  photos,
  generateUniversalTripPoint
};
