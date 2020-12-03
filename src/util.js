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

const RenderPosition = {
  AFTER: `after`,
  AFTERBEGIN: `afterbegin`,
  BEFORE: `before`
};

/**
 * формирует случайное целое число из диапазона чисел
 * @param {number} a - целое число
 * @param {number} b - целое число
 * @return {number} - случайное целое число
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

/**
 * формирует массив случайной длины (от 0 до длины массива)
 * @param {Array} array - исходный массив
 * @return {Array} - массив случайной длины
 */
const getRandomLengthArray = (array) => {
  return array.slice(0, getRandomInteger(0, array.length));
};

/**
 * возвращает одно случайное значение из массива значений
 * @param {Object} array - исходный массив
 * @return {*} - случайное значение
 */
const genereteRandomValue = (array) => {
  return array[getRandomInteger(array.length - 1)];
};

/**
 * Добавляет новый элемент (ul) в раметку и назначает ему атрибут class
 * @param {Object} container - блок html кода, относительно которого будет отрисована разметка
 */
const modificationHtml = (container) => {
  const newList = document.createElement(`ul`);
  newList.classList.add(`trip-events__list`);
  container.append(newList);
};

/**
 * Отрисовывает DOM элементы на странице
 * @param {Object} container - DOM элемент, относительно которого будет отрисован новый элемент
 * @param {Object} element - функция, формирующая DOM элемент
 * @param {String} place - местоположение отрисовываемого DOM элемента относительно существующего DOM элемента
 */
const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER:
      container.after(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE:
      container.before(element);
      break;
  }
};

/**
 * формирует DOM элемент
 * @param {String} template - HTML-код
 * @return {Object} - DOM элемент
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export {
  typeDescriptions,
  RenderPosition,
  getRandomInteger,
  getRandomLengthArray,
  genereteRandomValue,
  modificationHtml,
  renderElement,
  createElement
};
