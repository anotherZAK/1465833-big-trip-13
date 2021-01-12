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

  getFilterAttributes(filter, filterType) {
    if (filter === null || this.getFilter() === filterType.everything) {
      this._filterAttributes = [`checked`, ``, ``];
    } else if (this.getFilter() === filterType.future) {
      this._filterAttributes = [``, `checked`, ``];
    } else if (this.getFilter() === filterType.past) {
      this._filterAttributes = [``, ``, `checked`];
    }
    return this._filterAttributes;
  }
}

export {
  Filter
};
