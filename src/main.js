// import flatpickr from "flatpickr";
import {createTripInfoTemplate} from "./view/info-main.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFiltersTemplate} from "./view/event-filters.js";
import {createTripSortMenuTemplate} from "./view/sort-menu.js";

import {createTripItemTemplate} from "./view/event.js";
import {generateUniversalTripPoint} from "./mock/point.js";
import {sortCategories} from "./model/sort-categories.js";
import {filterCategories} from "./model/filter-categories.js";
import {createNewAndEditEventFormTemplate} from "./view/new-edit-event.js";

const TRIP_ITEMS_NUMBER = 15;

const tripPoint = new Array(TRIP_ITEMS_NUMBER).fill().map(generateUniversalTripPoint);
const editPoint = generateUniversalTripPoint();
const newPoint = generateUniversalTripPoint();

const tripMainElement = document.querySelector(`.trip-main`);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

const siteTripElement = document.querySelector(`.trip-events`);
const tripTitle = siteTripElement.querySelector(`h2`);

/**
 * Отрисовывает разметку html
 * @param {Object} container - блок html кода, относительно которого будет отрисована разметка
 * @param {Object} template - функция, формирующая разметку
 * @param {String} place - местоположение отрисовываемого блока относительно container
 */
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/**
 * Добавляет новый элемент (ul) в раметку и назначает ему атрибут class
 * @param {*} container - блок html кода, относительно которого будет отрисована разметка
 */
const modificationHtml = (container) => {
  const newList = document.createElement(`ul`);
  newList.classList.add(`trip-events__list`);
  container.appendChild(newList);
};

render(menuTitle, createSiteMenuTemplate(), `afterend`);
render(filtersTitle, createSiteFiltersTemplate(filterCategories), `afterend`);
render(tripTitle, createTripSortMenuTemplate(sortCategories), `afterend`);

modificationHtml(siteTripElement);
const tripList = siteTripElement.querySelector(`.trip-events__list`);

for (let i = 0; i < TRIP_ITEMS_NUMBER; i++) {
  render(tripList, createTripItemTemplate(tripPoint[i]), `beforeend`);
}

render(tripMainElement, createTripInfoTemplate(tripPoint), `afterbegin`);
render(tripList, createNewAndEditEventFormTemplate(newPoint), `afterbegin`);
render(tripList, createNewAndEditEventFormTemplate(editPoint, `edit`), `afterbegin`);

// const dateTimeInput = siteTripElement.querySelector(`.event__input--time`);
// flatpickr(dateTimeInput, {
//   dateFormat: `d/m/y H:i`,
//   enableTime: true,
// });
