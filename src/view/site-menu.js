import {Abstract as AbstractView} from "./abstract.js";
import {MenuItem} from "../util/const.js";

const createSiteMenuTemplate = () => {
  return `
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-menu-value="${MenuItem.TABLE}">Table</a>
      <a class="trip-tabs__btn" href="#" data-menu-value="${MenuItem.STATS}">Stats</a>
    </nav>
  `;
};

class SiteMenu extends AbstractView {
  constructor() {
    super();
    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.menuValue);
    const menuItemTable = this.getElement().querySelector(`[data-menu-value=${MenuItem.TABLE}]`);
    const menuItemStats = this.getElement().querySelector(`[data-menu-value=${MenuItem.STATS}]`);
    switch (evt.target.dataset.menuValue) {
      case MenuItem.TABLE:
        menuItemTable.style.opacity = 1;
        menuItemStats.style.opacity = 0.8;
        break;
      case MenuItem.STATS:
        menuItemTable.style.opacity = 0.8;
        menuItemStats.style.opacity = 1;
        break;
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }
}

export {
  SiteMenu
};
