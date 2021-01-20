import {SiteMenu} from "./view/site-menu.js";
import {MenuItem, sortCategories, UpdateType, FilterType} from "./util/const.js";
import {render, RenderPosition} from "./util/render.js";
import {TripPresenter} from "./presenter/trip-presenter.js";
import {FilterPresenter} from "./presenter/filter-presenter.js";
import {Points as PointsModel} from "./model/points.js";
import {Filter as FilterModel} from "./model/filter.js";
import {Stats} from "./view/stats.js";
import {Api} from "./api.js";

const AUTHORIZATION = `Basic fl4b683pl50713g`;
const URL = `https://13.ecmascript.pages.academy/big-trip`;

const api = new Api(URL, AUTHORIZATION);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);
const pageBodyContainer = document.querySelector(`main > .page-body__container`);

const siteMenuView = new SiteMenu();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const stats = new Stats();

const tripPresenter = new TripPresenter(sortCategories, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(filtersTitle, filterModel);

tripPresenter.init();

const hanleNewEventClick = (evt) => {
  evt.preventDefault();
  stats.destroy();
  tripPresenter.init(MenuItem.TABLE);
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.createPoint();
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.destroy(MenuItem.STATS);
      stats.destroy();
      tripPresenter.init(MenuItem.TABLE);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy(MenuItem.STATS);
      stats.destroy();
      render(pageBodyContainer, stats);
      stats.renderCharts(pointsModel.getPoints());
      break;
  }
};

api.getPoints().then((points) => {
  pointsModel.setPoints(UpdateType.INIT, points);
  render(menuTitle, siteMenuView, RenderPosition.AFTER);
  document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, hanleNewEventClick);
  siteMenuView.setMenuClickHandler(handleSiteMenuClick);
  filterPresenter.init();
})
.catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
  render(menuTitle, siteMenuView, RenderPosition.AFTER);
  filterPresenter.init();
});

api.getOffers().then((offers) => {
  pointsModel.setOffers(UpdateType.PATCH, offers);
});
