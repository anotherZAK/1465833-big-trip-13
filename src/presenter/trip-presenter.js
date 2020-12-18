import {EmptyList} from "../view/point-empty.js";
import {SortMenu} from "../view/sort-menu.js";
import {TripInfo} from "../view/info-main.js";
import {PointList} from "../view/point-list";
import {PointPresenter} from "./point-presenter.js";
import {render, RenderPosition} from "../util/render.js";
import {updateItem} from "../util/common.js";
import {sortByPrice, sortByTime} from "../util/point.js";
import {SortType} from "../model/sort-categories.js";

class TripPresenter {
  constructor(sortCategories, tripPoints) {
    this._tripMainElement = document.querySelector(`.trip-main`);
    this._siteTripElement = document.querySelector(`.trip-events`);
    this._tripTitle = this._siteTripElement.querySelector(`h2`);
    this._tripList = null;
    this._pointPresenter = {};
    this._currentSortType = SortType.day;
    this._sortCategories = sortCategories;
    this._tripPoints = tripPoints;

    this._emptyListView = new EmptyList();
    this._sortMenuView = new SortMenu(this._sortCategories);
    this._tripInfoView = new TripInfo(this._tripPoints);
    this._pointList = new PointList();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._sourcedTripPoints = this._tripPoints.slice();
    this._renderTrip();
  }

  _renderEmptyTripList() {
    render(this._siteTripElement, this._emptyListView, RenderPosition.AFTER);
  }

  _renderSortMenu() {
    render(this._siteTripElement, this._sortMenuView);
  }

  _renderTripInfo() {
    render(this._tripMainElement, this._tripInfoView);
  }

  _renderPointList() {
    render(this._siteTripElement, this._pointList);
  }

  _renderTrip() {
    this._renderPointList();
    const tripList = this._siteTripElement.querySelector(`.trip-events__list`);

    if (this._tripPoints.length === 0) {
      this._renderEmptyTripList();
    } else {
      this._renderSortMenu();
      this._renderTripInfo();
    }

    for (let i = 0; i < this._tripPoints.length; i++) {
      this._renderPoint(this._tripList, this._tripPoints[i]);
    }
  }

  /**
  * отрисовывает DOM элементы - точки маршрута и форму их редактирования
  * @param {Object} pointListElement -  DOM элемент, относительно которого будет отрисован новые DOM элементы
  * @param {Object} point - данные точки маршрута
  */
  _renderPoint(pointListElement, point) {
    const pointPresenter = new PointPresenter(pointListElement, point, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _clearPoint() {
    Object.values(this._pointPresenter).forEach((presenter) => {
      presenter.destroy();
    });
    this._pointPresenter = {};
  }

  _handlePointChange(updatePoint) {
    this._tripPoints = updateItem(this._tripPoints, updatePoint);
    this._pointPresenter[updatePoint.id].init(updatePoint);
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

    this._sortPoints(sortType);
    this._clearPoint();

    for (let i = 0; i < this._tripPoints.length; i++) {
      this._renderPoint(this._tripList, this._tripPoints[i]);
    }
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.price:
        this._tripPoints.sort(sortByPrice);
        break;
      case SortType.time:
        this._tripPoints.sort(sortByTime);
        break;
      default:

        this._tripPoints = this._sourcedTripPoints.slice();
    }

    this._currentSortType = sortType;
  }
}

export {
  TripPresenter
};
