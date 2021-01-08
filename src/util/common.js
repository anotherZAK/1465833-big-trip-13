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
  return array[getRandomInteger(0, array.length - 1)];
};

/**
 * формирует весовые коэффициенты для последующей сортировки по убыванию
 * @param {*} pointPrev - предыдущая поездка
 * @param {*} pointNext - следующая поездка
 * @return {number} - весовой коэффициент
 */
const sortByPrice = (pointPrev, pointNext) => {
  if (pointPrev.price > pointNext.price) {
    return 1;
  }

  return -1;
};

/**
 * формирует весовые коэффициенты для последующей сортировки по убыванию
 * @param {*} pointPrev - предыдущая поездка
 * @param {*} pointNext - следующая поездка
 * @return {number} - весовой коэффициент
 */
const sortByTime = (pointPrev, pointNext) => {
  if (pointPrev.endDateTime.diff(pointPrev.startDateTime) > pointNext.endDateTime.diff(pointNext.startDateTime)) {
    return 1;
  }

  return -1;
};

export {
  getRandomInteger,
  getRandomLengthArray,
  genereteRandomValue,
  sortByPrice,
  sortByTime
};
