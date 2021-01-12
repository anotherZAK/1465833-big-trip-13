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
  MAJOR: `MAJOR`
};

export {
  sortCategories,
  FilterType,
  SortType,
  UserAction,
  UpdateType
};
