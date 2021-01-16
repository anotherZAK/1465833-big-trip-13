import {SiteMenu} from "./view/site-menu.js";
import {sortCategories, UpdateType} from "./util/const.js";
import {render, RenderPosition} from "./util/render.js";
import {TripPresenter} from "./presenter/trip-presenter.js";
import {FilterPresenter} from "./presenter/filter-presenter.js";
import {Points as PointsModel} from "./model/points.js";
import {Filter as FilterModel} from "./model/filter.js";
import {Api} from "./api.js";

const AUTHORIZATION = `Basic fl4b683pl50713g`;
const URL = `https://13.ecmascript.pages.academy/big-trip`;

const api = new Api(URL, AUTHORIZATION);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

const siteMenuView = new SiteMenu();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const trip = new TripPresenter(sortCategories, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(filtersTitle, filterModel);

trip.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  trip.createPoint();
});

api.getPoints().then((points) => {
  pointsModel.setPoints(UpdateType.INIT, points);
  render(menuTitle, siteMenuView, RenderPosition.AFTER);
  filterPresenter.init();
})
.catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
  render(menuTitle, siteMenuView, RenderPosition.AFTER);
  filterPresenter.init();
});

