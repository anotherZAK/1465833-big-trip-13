import {Observer} from "../util/observer.js";
import {FilterType} from "../util/const.js";

class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.everything;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}

export {
  Filter
};
