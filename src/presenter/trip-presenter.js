import {Loading} from "../view/loading.js";
import {EmptyList} from "../view/point-empty.js";
import {SortMenu} from "../view/sort-menu.js";
import {PointList} from "../view/point-list";
import {PointNewPresenter} from "./point-new-presenter";
import {State, PointPresenter} from "./point-presenter.js";
import {render, RenderPosition, remove} from "../util/render.js";
import {filter, sortByDay, sortByPrice, sortByTime} from "../util/common.js";
import {MenuItem, FilterType, SortType, UserAction, UpdateType} from "../util/const.js";
import {newTrip} from "../util/const.js";
import {InfoMainPresenter} from "../presenter/info-main-presenter.js";

class TripPresenter {
  constructor(sortCategories, pointsModel, filterModel, api) {
    this._tripMainElement = document.querySelector(`.trip-main`);
    this._siteTripElement = document.querySelector(`.trip-events`);
    this._tripTitle = this._siteTripElement.querySelector(`h2`);

    this._tripList = null;
    this._infoMainPresenter = {};
    this._pointPresenter = {};
    this._currentSortType = SortType.day;
    this._sortCategories = sortCategories;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._api = api;
    this._isLoading = true;

    this._emptyListView = new EmptyList();
    this._sortMenuView = new SortMenu(this._sortCategories);
    this._pointList = new PointList();
    this._loadingComponent = new Loading();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._pointNewPresenter = new PointNewPresenter([], this._pointList, this._handleViewAction);
  }

  init(menuItem) {
    this._renderTrip(menuItem);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy(menuItem) {
    this._clearPointList(menuItem);

    remove(this._pointList);
    remove(this._sortMenuView);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint() {
    const points = this._pointsModel.getPoints();
    this._pointNewPresenter.init(points, newTrip);
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter(points, filterType);

    switch (this._currentSortType) {
      case SortType.day:
        return filtredPoints.sort(sortByDay);
      case SortType.price:
        return filtredPoints.sort(sortByPrice);
      case SortType.time:
        return filtredPoints.sort(sortByTime);
    }

    return filtredPoints;
  }

  _renderLoading() {
    render(this._siteTripElement, this._loadingComponent, RenderPosition.AFTER);
  }

  _renderEmptyTripList() {
    render(this._siteTripElement, this._emptyListView, RenderPosition.AFTER);
  }

  _renderSortMenu() {
    render(this._siteTripElement, this._sortMenuView);
    this._sortMenuView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPointList() {
    render(this._siteTripElement, this._pointList);
  }

  _renderTrip(menuItem, offers) {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    this._renderPointList();

    const pointCount = this._getPoints().length;
    const points = this._getPoints().slice();

    if (pointCount === 0 && this._filterModel.getFilter() === FilterType.EVERYTHING) {
      this._renderEmptyTripList();
      remove(this._sortMenuView);
    } else if (menuItem === MenuItem.TABLE) {
      this._renderSortMenu();
    } else {
      this._renderSortMenu();
      this._renderInfoMain(points);
    }

    this._tripList = this._siteTripElement.querySelector(`.trip-events__list`);
    for (let i = 0; i < pointCount; i++) {
      this._renderPoint(this._tripList, points, points[i], offers);
    }
  }

  _renderInfoMain(points) {
    const infoMainPresenter = new InfoMainPresenter(points, this._tripMainElement);
    infoMainPresenter.init(points);
    this._infoMainPresenter = infoMainPresenter;
  }

  /**
  * отрисовывает DOM элементы - точки маршрута и форму их редактирования
  * @param {Object} pointListElement -  DOM элемент, относительно которого будет отрисован новые DOM элементы
  * @param {Object} points - точки маршрута
  * @param {Object} point - данные точки маршрута
  * @param {Object} offers - опции точки маршрута
  */
  _renderPoint(pointListElement, points, point, offers) {
    const pointPresenter = new PointPresenter(pointListElement, points, point, offers, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(points, point, offers);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPointList(menuItem) {
    this._pointNewPresenter.destroy();
    if (menuItem === MenuItem.TABLE) {
      this._infoMainPresenter.destroy();
    }

    Object.values(this._pointPresenter).forEach((presenter) => {
      presenter.destroy();
    });
    this._pointPresenter = {};
  }

  _clearInfoMain() {
    this._infoMainPresenter.destroy();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter[update.id].setViewState(State.SAVING);
        this._api.updatePoint(update)
        .then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        })
        .catch(() => {
          this._pointPresenter[update.id].setViewState(State.ABORTING);
        });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
        .then((response) => {
          this._pointsModel.addPoint(updateType, response);
        })
        .catch(() => {
          this._pointNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(State.DELETING);
        this._api.deletePoint(update)
        .then(() => {
          this._pointsModel.deletePoint(updateType, update);
        })
        .catch(() => {
          this._pointPresenter[update.id].setViewState(State.ABORTING);
        });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._clearPointList(MenuItem.TABLE);
        this._renderTrip(null, data);
        break;
      case UpdateType.MINOR:
        this._clearPointList(MenuItem.TABLE);
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearPointList(MenuItem.TABLE);
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();

    Object.values(this._pointPresenter).forEach((presenter) => {
      return presenter.resetView();
    });
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    const pointCount = this._getPoints().length;
    const points = this._getPoints().slice();
    this._clearPointList(MenuItem.TABLE);

    this._tripList = this._siteTripElement.querySelector(`.trip-events__list`);

    this._renderInfoMain(points);
    for (let i = 0; i < pointCount; i++) {
      this._renderPoint(this._tripList, points, points[i]);
    }
  }
}

export {
  TripPresenter
};
