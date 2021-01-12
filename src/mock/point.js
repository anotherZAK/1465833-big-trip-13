import dayjs from "dayjs";
import {getRandomInteger, genereteRandomValue} from "../util/common.js";

const typeDescriptions = [
  {
    type: `taxi`,
    optionsNumber: 2
  },
  {
    type: `bus`,
    optionsNumber: 1
  },
  {
    type: `train`,
    optionsNumber: 3
  },
  {
    type: `ship`,
    optionsNumber: 5
  },
  {
    type: `transport`,
    optionsNumber: 1
  },
  {
    type: `drive`,
    optionsNumber: 0
  },
  {
    type: `flight`,
    optionsNumber: 2
  },
  {
    type: `check-in`,
    optionsNumber: 2
  },
  {
    type: `sightseeing`,
    optionsNumber: 1
  },
  {
    type: `restaurant`,
    optionsNumber: 0
  },
];

const pointDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`
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

const Destination = [
  {
    point: `Rome`,
    description: pointDescription.slice(1),
    photos: photos.slice(0, 7)
  },
  {
    point: `Reykjavik`,
    description: pointDescription.slice(2),
    photos: photos.slice(2, 5)
  },
  {
    point: `Ulan Bator`,
    description: pointDescription.slice(3),
    photos: photos.slice(4, 7)
  },
  {
    point: `Madrid`,
    description: pointDescription.slice(4),
    photos: photos.slice(6, 7)
  },
  {
    point: `New York`,
    description: [],
    photos: []
  },
  {
    point: `Paris`,
    description: pointDescription.slice(2),
    photos: photos.slice(2, 6)
  },
  {
    point: `Moscow`,
    description: pointDescription.slice(1),
    photos: photos.slice(4, 5)
  },
  {
    point: `Tokio`,
    description: pointDescription.slice(2),
    photos: photos.slice(3, 6)
  },
  {
    point: `London`,
    description: pointDescription.slice(3),
    photos: photos.slice(1, 5)
  },
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

const TimeRange = {
  past: -23,
  future: -2
};

const Favorite = {
  true: `event__favorite-btn--active`,
  false: ``
};

const generateId = () => {
  return Date.now() + parseInt(Math.random() * 10000, 10);
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
 * возвращает количество доступных для выбора опций
 * @param {String} pointType - тип поездки
 * @return {number} - количество доступных опций
 */
const offersFromPointType = (pointType) => {
  let optionsNumber = null;
  for (const description of typeDescriptions) {
    if (description.type === pointType) {
      optionsNumber = description.optionsNumber;
    }
  }
  return optionsNumber;
};

/**
 * формирует тестовые данные для отрисовки формы создания и редактирования точки маршрута
 * @return {Object} - тестовые данные
 */
const generateUniversalTripPoint = () => {
  const eventType = genereteRandomValue(typeDescriptions).type;
  const destination = genereteRandomValue(Destination);
  return {
    id: generateId(),
    type: eventType,
    destination: destination.point,
    startDateTime: generateDate(TimeRange.past),
    endDateTime: generateDate(TimeRange.future),
    price: getRandomInteger(Prices.min, Prices.max),
    offers: offers.slice(0, offersFromPointType(eventType)),
    destinationInfo: {
      description: destination.description,
      photos: destination.photos,
    },
    isFavorite: genereteRandomValue(Object.values(Favorite))
  };
};

export {
  typeDescriptions,
  Destination,
  Favorite,
  offers,
  generateUniversalTripPoint,
  offersFromPointType
};
