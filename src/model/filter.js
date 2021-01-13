import {Observer} from "../util/observer.js";
import {FilterType} from "../util/const.js";

class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.everything;
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
      case filterType.everything:
        this._filterAttributes = [`checked`, ``, ``];
        break;
      case filterType.future:
        this._filterAttributes = [``, `checked`, ``];
        break;
      case filterType.past:
        this._filterAttributes = [``, ``, `checked`];
        break;
    }
    return this._filterAttributes;
  }
}

export {
  Filter
};
