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
  typeDescriptions,
  sortByPrice,
  sortByTime
};
