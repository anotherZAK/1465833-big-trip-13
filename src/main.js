// import flatpickr from "flatpickr";
import {SiteMenu} from "./view/site-menu.js";
import {SiteFilters} from "./view/point-filters.js";
import {generateUniversalTripPoint} from "./mock/point.js";
import {sortCategories} from "./util/const.js";
import {filterCategories} from "./util/const.js";
import {render, RenderPosition} from "./util/render.js";
import {TripPresenter} from "./presenter/trip-presenter.js";
import {Points} from "./model/points.js";

const TRIP_ITEMS_NUMBER = 3;
const tripPoints = new Array(TRIP_ITEMS_NUMBER).fill().map(generateUniversalTripPoint);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

const siteMenuView = new SiteMenu();
const siteFiltersView = new SiteFilters(filterCategories);
const pointsModel = new Points();

pointsModel.setPoints(tripPoints);
const trip = new TripPresenter(sortCategories, tripPoints, pointsModel);

render(menuTitle, siteMenuView, RenderPosition.AFTER);
render(filtersTitle, siteFiltersView, RenderPosition.AFTER);
trip.init();


// const dateTimeInput = siteTripElement.querySelector(`.event__input--time`);
// flatpickr(dateTimeInput, {
//   dateFormat: `d/m/y H:i`,
//   enableTime: true,
// });
