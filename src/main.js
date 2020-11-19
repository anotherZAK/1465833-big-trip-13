import {createTripInfoTemplate} from "./view/trip-info-main.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFiltersTemplate} from "./view/site-filters.js";
import {createTripSortMenuTemplate} from "./view/trip-sort-menu.js";
import {createEditEventFormTemplate} from "./view/edit-event.js";
import {createNewEventTemplate} from "./view/new-event.js";
import {createTripItemTemplate} from "./view/trip-item.js";

const TRIP_ITEMS_NUMBER = 3;

const tripMainElement = document.querySelector(`.trip-main`);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

const siteTripElement = document.querySelector(`.trip-events`);
const tripTitle = siteTripElement.querySelector(`h2`);

const render = (container, template, place) => {
  if (container.classList.contains(`trip-events`)) {
    const newList = document.createElement(`ul`);
    newList.classList.add(`trip-events__list`);

    for (let i = 0; i < TRIP_ITEMS_NUMBER; i++) {
      newList.insertAdjacentHTML(place, template);
    }
    container.appendChild(newList);
  } else {
    container.insertAdjacentHTML(place, template);
  }
};

render(tripMainElement, createTripInfoTemplate(), `afterbegin`);
render(menuTitle, createSiteMenuTemplate(), `afterend`);
render(filtersTitle, createSiteFiltersTemplate(), `afterend`);
render(tripTitle, createTripSortMenuTemplate(), `afterend`);
render(siteTripElement, createTripItemTemplate(), `afterbegin`);

const tripList = siteTripElement.querySelector(`.trip-events__list`);

render(tripList, createNewEventTemplate(), `afterbegin`);
render(tripList, createEditEventFormTemplate(), `afterbegin`);
