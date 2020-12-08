import {createElement} from "../util.js";

const createTripSortMenuTemplate = (menuItems) => {

  /**
   * формирует массив, элементами которого являются пункты меню сортировки
   * @return {Array} - массив, элементами которого являются пункты меню сортировки
   */
  const createSortMenuItemsTemplate = () => {
    const sortMenuContainer = [];
    for (const category of menuItems) {
      const {name, attribute} = category;
      sortMenuContainer.push(`
        <div class="trip-sort__item  trip-sort__item--${name}">
          <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" ${attribute}>
          <label class="trip-sort__btn" for="sort-${name}">${name}</label>
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

class SortMenu {
  constructor(menuItems) {
    this._menuItems = menuItems;
    this._element = null;
  }

  getTemplate() {
    return createTripSortMenuTemplate(this._menuItems);
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
  SortMenu
};
