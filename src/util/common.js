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
 * вставляет новый элемент в массив на место старого
 * @param {Array} items - исходный массив
 * @param {*} update - новый элемент
 * @return {Array} - новый массив
 */
const updateItem = (items, update) => {
  const index = items.findIndex((item) => {
    return item.id === update.id;
  });

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export {
  getRandomInteger,
  getRandomLengthArray,
  genereteRandomValue,
  updateItem
};
