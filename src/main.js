// import flatpickr from "flatpickr";
import {SiteMenu} from "./view/site-menu.js";
import {SiteFilters} from "./view/event-filters.js";
import {generateUniversalTripPoint} from "./mock/point.js";
import {sortCategories} from "./model/sort-categories.js";
import {filterCategories} from "./model/filter-categories.js";
import {render, RenderPosition} from "./util/render.js";
import {TripPresenter} from "./presenter/trip.js";

const TRIP_ITEMS_NUMBER = 5;
const tripPoints = new Array(TRIP_ITEMS_NUMBER).fill().map(generateUniversalTripPoint);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

const siteMenuView = new SiteMenu();
const siteFiltersView = new SiteFilters(filterCategories);
const trip = new TripPresenter(sortCategories, tripPoints);

render(menuTitle, siteMenuView, RenderPosition.AFTER);
render(filtersTitle, siteFiltersView, RenderPosition.AFTER);
trip.init();


// const dateTimeInput = siteTripElement.querySelector(`.event__input--time`);
// flatpickr(dateTimeInput, {
//   dateFormat: `d/m/y H:i`,
//   enableTime: true,
// });
