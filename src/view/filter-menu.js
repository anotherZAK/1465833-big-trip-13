import {Abstract as AbstractView} from "./abstract.js";
import {FilterType} from "../util/const.js";

const createSiteFiltersTemplate = (filterItems) => {

  /**
   * формирует строку, элементами которого являются пункты фильтра
   * @return {String} - строка, элементами которого являются пункты фильтра
   */
  const createFilterMenuItemsTemplate = () => {
    const sortMenuContainer = [];
    for (const category of filterItems) {
      const {name, attribute} = category;
      sortMenuContainer.push(`
        <div class="trip-filters__filter">
          <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${attribute}>
          <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
        </div>
      `);
    }
    return sortMenuContainer.join(` `);
  };

  return `
    <form class="trip-filters" action="#" method="get">
      ${createFilterMenuItemsTemplate()}
    </form>
  `;
};

class SiteFilters extends AbstractView {
  constructor(filterItems) {
    super();
    this._filterItems = filterItems;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  _filterTypeChangeHandler(evt) {
    if (!FilterType[evt.target.textContent]) {
      return;
    }

    this._callback.filterTypeChange(evt.target.textContent);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  getTemplate() {
    return createSiteFiltersTemplate(this._filterItems);
  }
}

export {
  SiteFilters
};
