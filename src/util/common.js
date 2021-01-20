import {FilterType} from "./const.js";
import dayjs from "dayjs";

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
  * формирует строку, содержащий продолжительность времени между двумя датами
  * @param {Object} startDateTime - время начала события
  * @param {Object} endDateTime - время окончания события
  * @return {String} - строка
  */
const calculateDiffTime = (startDateTime, endDateTime) => {
  const diffTime = [];
  const modules = {
    minute: 60,
    hour: 24,
  };
  const diffTimeMin = endDateTime.diff(startDateTime, `m`) % modules.minute;
  const diffTimeHour = endDateTime.diff(startDateTime, `h`) % modules.hour;
  const diffTimeDay = endDateTime.diff(startDateTime, `d`);

  if (diffTimeDay !== 0) {
    diffTime.push(`${diffTimeDay} D`);
  }
  if (diffTimeHour !== 0) {
    diffTime.push(`${diffTimeHour} H`);
  }
  if (diffTimeMin !== 0) {
    diffTime.push(`${diffTimeMin} M`);
  }

  return diffTime.join(`, `);
};

/**
 * фильтрует точки маршрута
 * @param {*} points точка маршрута
 * @param {String} filterType - способ фильтрации
 * @return {*} - отфильтрованные точки маршрута
 */
const filter = (points, filterType) => {
  let filteredPoints = null;
  switch (filterType) {
    case FilterType.EVERYTHING:
      filteredPoints = points;
      break;
      // фильтрует (исключает) точки маршрута дата начала которых меньше или равна текущей
    case FilterType.FUTURE:
      filteredPoints = points.filter((point) => {
        return point.startDateTime.diff(dayjs()) >= 0;
      });
      break;
      // фильтрует (исключает) точки маршрута дата окончания которых больше, чем текущая
    case FilterType.PAST:
      filteredPoints = points.filter((point) => {
        return point.endDateTime.diff(dayjs()) < 0;
      });
      break;
  }
  return filteredPoints;
};

/**
 * формирует весовые коэффициенты для последующей сортировки по убыванию
 * @param {*} pointPrev - предыдущая точка маршрута
 * @param {*} pointNext - следующая точка маршрута
 * @return {number} - весовой коэффициент
 */
const sortByDay = (pointPrev, pointNext) => {
  if (pointPrev.startDateTime.diff(dayjs()) < pointNext.startDateTime.diff(dayjs())) {
    return 1;
  }

  return -1;
};

/**
 * формирует весовые коэффициенты для последующей сортировки по убыванию
 * @param {*} pointPrev - предыдущая точка маршрута
 * @param {*} pointNext - следующая точка маршрута
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
 * @param {*} pointPrev - предыдущая точка маршрута
 * @param {*} pointNext - следующая точка маршрута
 * @return {number} - весовой коэффициент
 */
const sortByTime = (pointPrev, pointNext) => {
  if (pointPrev.endDateTime.diff(pointPrev.startDateTime) > pointNext.endDateTime.diff(pointNext.startDateTime)) {
    return 1;
  }

  return -1;
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

export {
  getRandomInteger,
  getRandomLengthArray,
  genereteRandomValue,
  calculateDiffTime,
  filter,
  sortByDay,
  sortByPrice,
  sortByTime,
  generateDate
};
