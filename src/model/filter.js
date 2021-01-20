import {Observer} from "../util/observer.js";
import {FilterType} from "../util/const.js";

class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
    this._filterAttributes = null;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }

  getFilterAttributes(filterType) {
    switch (this.getFilter()) {
      case filterType.EVERYTHING:
        this._filterAttributes = [`checked`, ``, ``];
        break;
      case filterType.FUTURE:
        this._filterAttributes = [``, `checked`, ``];
        break;
      case filterType.PAST:
        this._filterAttributes = [``, ``, `checked`];
        break;
    }
    return this._filterAttributes;
  }
}

export {
  Filter
};
