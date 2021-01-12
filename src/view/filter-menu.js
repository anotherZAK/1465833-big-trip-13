import {Abstract as AbstractView} from "./abstract.js";
import {FilterType} from "../util/const.js";

const createSiteFiltersTemplate = (filterItems, attribute) => {

  /**
   * формирует строку, элементами которого являются пункты фильтра
   * @return {String} - строка, элементами которого являются пункты фильтра
   */
  const createFilterMenuItemsTemplate = () => {
    const sortMenuContainer = [];
    for (let i = 0; i < filterItems.length; i++) {
      sortMenuContainer.push(`
        <div class="trip-filters__filter">
          <input id="filter-${filterItems[i]}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterItems[i]}" ${attribute ? attribute[i] : ``}>
          <label class="trip-filters__filter-label" for="filter-${filterItems[i]}">${filterItems[i]}</label>
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
  constructor(filterItems, attribute) {
    super();
    this._filterItems = filterItems;
    this._attribute = attribute;
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
    return createSiteFiltersTemplate(this._filterItems, this._attribute);
  }
}

export {
  SiteFilters
};
