import dayjs from "dayjs";

const Favorite = {
  true: `event__favorite-btn--active`,
  false: ``
};

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

const sortCategories = [
  {
    name: `day`,
    attribute: `checked`
  },
  {
    name: `event`,
    attribute: `disabled`
  },
  {
    name: `time`,
    attribute: ``
  },
  {
    name: `price`,
    attribute: ``
  },
  {
    name: `offer`,
    attribute: `disabled`
  }
];

const FilterType = {
  everything: `everything`,
  future: `future`,
  past: `past`,
};

const SortType = {
  day: `day`,
  time: `time`,
  price: `price`,
};

const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

let newTrip = {
  id: 21,
  type: `taxi`,
  destination: `Vien`,
  startDateTime: dayjs(),
  endDateTime: dayjs().add(1, `hour`),
  price: 100,
  offers: [],
  destinationInfo: {
    description: [`Vien, is a beautiful city, a true asian pearl, with a beautiful old town.`],
    photos: [
      `http://picsum.photos/300/200?r=0.04136277902832819`,
      `http://picsum.photos/300/200?r=0.38679695284752813`,
      `http://picsum.photos/300/200?r=0.9321531231042333`,
      `http://picsum.photos/300/200?r=0.46504761603008915`
    ],
  },
  isFavorite: ``
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


export {
  Favorite,
  sortCategories,
  FilterType,
  SortType,
  UserAction,
  UpdateType,
  typeDescriptions,
  newTrip,
  offersFromPointType
};
