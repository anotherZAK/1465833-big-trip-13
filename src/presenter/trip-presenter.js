import {EmptyList} from "../view/point-empty.js";
import {SortMenu} from "../view/sort-menu.js";
import {TripInfo} from "../view/info-main.js";
import {PointList} from "../view/point-list";
import {PointPresenter} from "./point-presenter.js";
import {render, RenderPosition, remove} from "../util/render.js";
import {sortByPrice, sortByTime} from "../util/common.js";
import {SortType, UserAction, UpdateType} from "../model/sort-categories.js";

class TripPresenter {
  constructor(sortCategories, tripPoints, pointsModel) {
    this._tripMainElement = document.querySelector(`.trip-main`);
    this._siteTripElement = document.querySelector(`.trip-events`);
    this._tripTitle = this._siteTripElement.querySelector(`h2`);

    this._tripList = null;
    this._pointPresenter = {};
    this._currentSortType = SortType.day;
    this._sortCategories = sortCategories;
    this._tripPoints = tripPoints;
    this._pointsModel = pointsModel;

    this._emptyListView = new EmptyList();
    this._sortMenuView = new SortMenu(this._sortCategories);
    this._tripInfoView = new TripInfo(this._tripPoints);
    this._pointList = new PointList();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTrip();
  }

  _getPoints() {
    switch (this._currentSortType) {
      case SortType.price:
        return this._pointsModel.getPoints().slice().sort(sortByPrice);
      case SortType.time:
        return this._pointsModel.getPoints().slice().sort(sortByTime);
    }

    return this._pointsModel.getPoints();
  }

  _renderEmptyTripList() {
    render(this._siteTripElement, this._emptyListView, RenderPosition.AFTER);
  }

  _renderSortMenu() {
    render(this._siteTripElement, this._sortMenuView);
    this._sortMenuView.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderTripInfo() {
    render(this._tripMainElement, this._tripInfoView);
  }

  _renderPointList() {
    render(this._siteTripElement, this._pointList);
  }

  _renderTrip() {
    this._renderPointList();
    this._tripList = this._siteTripElement.querySelector(`.trip-events__list`);
    const pointCount = this._getPoints().length;
    const points = this._getPoints().slice();

    if (pointCount === 0) {
      this._renderEmptyTripList();
      remove(this._sortMenuView);
    } else {
      this._renderSortMenu();
      this._renderTripInfo();
    }

    for (let i = 0; i < pointCount; i++) {
      this._renderPoint(this._tripList, points[i]);
    }
  }

  /**
  * отрисовывает DOM элементы - точки маршрута и форму их редактирования
  * @param {Object} pointListElement -  DOM элемент, относительно которого будет отрисован новые DOM элементы
  * @param {Object} point - данные точки маршрута
  */
  _renderPoint(pointListElement, point) {
    const pointPresenter = new PointPresenter(pointListElement, point, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPoint() {
    Object.values(this._pointPresenter).forEach((presenter) => {
      presenter.destroy();
    });
    this._pointPresenter = {};
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearPoint();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearPoint();
        this._renderTrip();
        break;
    }
  }

  _handleModeChange() {
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
    this._clearPoint();

    this._tripList = this._siteTripElement.querySelector(`.trip-events__list`);

    for (let i = 0; i < pointCount; i++) {
      this._renderPoint(this._tripList, points[i]);
    }
  }
}

export {
  TripPresenter
};
