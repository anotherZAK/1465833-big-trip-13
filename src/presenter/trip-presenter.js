import {EmptyList} from "../view/point-empty.js";
import {SortMenu} from "../view/sort-menu.js";
import {TripInfo} from "../view/info-main.js";
import {PointList} from "../view/point-list";
import {PointPresenter} from "./point-presenter.js";
import {render, RenderPosition} from "../util/render.js";
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
    // this._sourcedTripPoints = this._tripPoints.slice();
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
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
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

    const pointCount = this._getPoints().length;
    const points = this._getPoints().slice();

    // this._sortPoints(sortType);
    this._currentSortType = sortType;
    this._clearPoint();

    this._tripList = this._siteTripElement.querySelector(`.trip-events__list`);

    for (let i = 0; i < pointCount; i++) {
      this._renderPoint(this._tripList, points[i]);
    }
  }

  // _sortPoints(sortType) {
  //   switch (sortType) {
  //     case SortType.price:
  //       this._tripPoints.sort(sortByPrice);
  //       break;
  //     case SortType.time:
  //       this._tripPoints.sort(sortByTime);
  //       break;
  //     default:

  //       this._tripPoints = this._sourcedTripPoints.slice();
  //   }

  //   this._currentSortType = sortType;
  // }
}

export {
  TripPresenter
};
