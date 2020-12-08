import {createElement} from "../util.js";

const createSiteFiltersTemplate = (filterItems) => {

  /**
   * формирует массив, элементами которого являются пункты фильтра
   * @return {Array} - массив, элементами которого являются пункты фильтра
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

class SiteFilters {
  constructor(filterItems) {
    this._filterItems = filterItems;
    this._element = null;
  }

  getTemplate() {
    return createSiteFiltersTemplate(this._filterItems);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {
  SiteFilters
};
