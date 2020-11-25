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
 * формирует массив, элементами которого является тип поездки
 * @param {Array} array - исходные массив с данными
 * @return {Array} - массив элементами которого является тип поездки
 */
const createEventTypeItems = (array) => {
  let typeEventContainer = [];
  for (const typeDescription of array) {
    typeEventContainer.push(`
      <div class="event__type-item">
        <input id="event-type-${typeDescription}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeDescription}">
        <label class="event__type-label  event__type-label--${typeDescription}" for="event-type-${typeDescription}-1">${typeDescription}</label>
      </div>
      `);
  }
  return typeEventContainer;
};

/**
* формирует массив, элементами которого является дополнительные опции поездки
* @param {Array} data - исходные массив с данными
* @return {Array} - массив элементами которого является дополнительные опции поездки
*/
const createEventOfferItems = (data) => {
  const offerEventContainer = [];
  for (const offer of data.offers) {
    if (offer) {
      offerEventContainer.push(`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" checked>
          <label class="event__offer-label" for="event-offer-${offer.type}-1">
            <span class="event__offer-title">${offer.option}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `);
    }
  }
  return offerEventContainer;
};

/**
 * формирует шаблон блока с дополнительными опциями поездки
 * @param {Array} container - массив с дополнительными опции поездки
 * @return {String} - блок кода с дополнительными опциями поездки
 */
const createEventOfferBlockTemplate = (container) => {
  let offersTemplate = ``;
  if (container.length) {
    offersTemplate = `
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${container.join(` `)}
        </div>
    `;
  }
  return offersTemplate;
};

/**
 * формирует шаблон блока с описанием пункта назначения
 * @param {Array} container - массив с описаниями пункта назначения
 * @return {String} - блок кода с описанием пункта назначения
 */
const createDestinationBlockTemplate = (container) => {
  let destinationTemplate = ``;
  if (container.length) {
    destinationTemplate = `
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${container}</p>
    `;
  }
  return destinationTemplate;
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
 * формирует тестовые данные для отрисовки формы создания и редактирования точки маршрута
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

export {
  typeDescriptions,
  destinations,
  pointDescription,
  prices,
  offers,
  photos,
  generateTripPoint,
  generateNewAndEditTripPoint,
  createEventTypeItems,
  createEventOfferItems,
  createEventOfferBlockTemplate,
  createDestinationBlockTemplate
};
