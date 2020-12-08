// import flatpickr from "flatpickr";
import {TripInfo} from "./view/info-main.js";
import {SiteMenu} from "./view/site-menu.js";
import {SiteFilters} from "./view/event-filters.js";
import {SortMenu} from "./view/sort-menu.js";
import {NewPoint} from "./view/event.js";
import {generateUniversalTripPoint} from "./mock/point.js";
import {sortCategories} from "./model/sort-categories.js";
import {filterCategories} from "./model/filter-categories.js";
import {PointForm} from "./view/new-edit-event.js";
import {renderElement, RenderPosition} from "./util.js";

const TRIP_ITEMS_NUMBER = 15;

const tripMainElement = document.querySelector(`.trip-main`);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

const siteTripElement = document.querySelector(`.trip-events`);
const tripTitle = siteTripElement.querySelector(`h2`);

const tripPoints = new Array(TRIP_ITEMS_NUMBER).fill().map(generateUniversalTripPoint);
const sortMenuView = new SortMenu(sortCategories);
const siteMenuView = new SiteMenu();
const tripInfoView = new TripInfo(tripPoints);
const siteFiltersView = new SiteFilters(filterCategories);

/**
 * Добавляет новый элемент (ul) в раметку и назначает ему атрибут class
 * @param {*} container - блок html кода, относительно которого будет отрисована разметка
 */
const modificationHtml = (container) => {
  const newList = document.createElement(`ul`);
  newList.classList.add(`trip-events__list`);
  container.appendChild(newList);
};

const renderPoint = (pointListElement, point) => {
  const pointComponent = new NewPoint(point);
  const pointEditComponent = new PointForm(point, `edit`);

  const replacePointToForm = () => {
    pointComponent.getElement().replaceWith(pointEditComponent.getElement());
  };

  const replaceFormToPoint = (evt) => {
    evt.preventDefault();
    pointEditComponent.getElement().replaceWith(pointComponent.getElement());
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, replacePointToForm);
  pointEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, replaceFormToPoint);

  renderElement(pointListElement, pointComponent.getElement(), RenderPosition.AFTERBEGIN);
};

renderElement(menuTitle, siteMenuView.getElement(), RenderPosition.AFTER);

renderElement(filtersTitle, siteFiltersView.getElement(), RenderPosition.AFTER);
renderElement(tripTitle, sortMenuView.getElement(), RenderPosition.AFTER);

modificationHtml(siteTripElement);
const tripList = siteTripElement.querySelector(`.trip-events__list`);

for (let i = 0; i < tripPoints.length; i++) {
  renderPoint(tripList, tripPoints[i]);
}

renderElement(tripMainElement, tripInfoView.getElement(), RenderPosition.AFTERBEGIN);


// const dateTimeInput = siteTripElement.querySelector(`.event__input--time`);
// flatpickr(dateTimeInput, {
//   dateFormat: `d/m/y H:i`,
//   enableTime: true,
// });
