import {Abstract as AbstractView} from "./abstract.js";
import {SortType} from "../util/const.js";

const createTripSortMenuTemplate = (menuItems) => {

  /**
   * формирует строку, элементами которого являются пункты меню сортировки
   * @return {String} - строка, элементами которого являются пункты меню сортировки
   */
  const createSortMenuItemsTemplate = () => {
    const sortMenuContainer = [];
    for (const category of menuItems) {
      const {name, attribute} = category;
      sortMenuContainer.push(`
        <div class="trip-sort__item  trip-sort__item--${name}">
          <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${attribute}>
          <label class="trip-sort__btn" data-sort-type=${name} for="sort-${name}">${name}</label>
        </div>
      `);
    }
    return sortMenuContainer.join(` `);
  };

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${createSortMenuItemsTemplate()}
    </form>
  `;
};

class SortMenu extends AbstractView {
  constructor(menuItems) {
    super();
    this._menuItems = menuItems;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  _sortTypeChangeHandler(evt) {
    if (!SortType[evt.target.textContent]) {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  getTemplate() {
    return createTripSortMenuTemplate(this._menuItems);
  }
}

export {
  SortMenu
};
