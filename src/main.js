import {SiteMenu} from "./view/site-menu.js";
import {generateUniversalTripPoint} from "./mock/point.js";
import {sortCategories} from "./util/const.js";
import {render, RenderPosition} from "./util/render.js";
import {TripPresenter} from "./presenter/trip-presenter.js";
import {FilterPresenter} from "./presenter/filter-presenter.js";
import {Points as PointsModel} from "./model/points.js";
import {Filter as FilterModel} from "./model/filter.js";

const TRIP_ITEMS_NUMBER = 3;
const tripPoints = new Array(TRIP_ITEMS_NUMBER).fill().map(generateUniversalTripPoint);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

const siteMenuView = new SiteMenu();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

pointsModel.setPoints(tripPoints);
const trip = new TripPresenter(sortCategories, tripPoints, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersTitle, filterModel);

render(menuTitle, siteMenuView, RenderPosition.AFTER);
filterPresenter.init();
trip.init();

