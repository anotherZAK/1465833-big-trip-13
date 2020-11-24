
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

/**
 * формирует случайное целое число из диапазона чисел
 * @param {number} a - целое число
 * @param {number} b - целое число
 * @return {numnumber} - случайное целое число
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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
 * формирует массив случайной длины (от 0 до длины массива)
 * @param {Array} array - исходный массив
 * @return {Array} - массив случайной длины
 */
const getRandomLengthArray = (array) => {
  return array.slice(0, getRandomInteger(0, array.length));
};

/**
 * формирует массив, элементами которого является тип поездки
 * @param {Array} array - исходные массив с данными
 * @return {Array} - массив элементами которого является тип поездки
 */
const createEventTypeItems = (array) => {
  let typeEventContainer = [];
  for (const typeDescription of array) {
    typeEventContainer.push(`<div class="event__type-item">
            <input id="event-type-${typeDescription}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeDescription}">
            <label class="event__type-label  event__type-label--${typeDescription}" for="event-type-${typeDescription}-1">${typeDescription}</label>
          </div>`);
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
      offerEventContainer.push(`<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" checked>
      <label class="event__offer-label" for="event-offer-${offer.type}-1">
        <span class="event__offer-title">${offer.option}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
      </div>`);
    }
  }
  return offerEventContainer;
};

export {typeDescriptions,
  destinations,
  pointDescription,
  prices,
  offers,
  photos,
  getRandomInteger,
  getRandomLengthArray,
  createEventTypeItems,
  createEventOfferItems
};
