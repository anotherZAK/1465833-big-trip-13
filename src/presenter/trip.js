import {EmptyList} from "../view/event-empty.js";
import {SortMenu} from "../view/sort-menu.js";
import {TripInfo} from "../view/info-main.js";
import {PointPresenter} from "./point.js";
import {renderList, render, RenderPosition} from "../util/render.js";
import {updateItem} from "../util/common.js";

class TripPresenter {
  constructor(sortCategories, tripPoints) {
    this._tripMainElement = document.querySelector(`.trip-main`);
    this._siteTripElement = document.querySelector(`.trip-events`);
    this._tripTitle = this._siteTripElement.querySelector(`h2`);
    this._pointPresenter = {};

    this._sortCategories = sortCategories;
    this._tripPoints = tripPoints;

    this._emptyListView = new EmptyList();
    this._sortMenuView = new SortMenu(this._sortCategories);
    this._tripInfoView = new TripInfo(this._tripPoints);

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init() {
    this._renderTrip();
  }

  _renderEmptyTripList() {
    render(this._siteTripElement, this._emptyListView, RenderPosition.AFTER);
  }

  _renderSortMenu() {
    render(this._tripTitle, this._sortMenuView, RenderPosition.AFTER);
  }

  _renderTripInfo() {
    render(this._tripMainElement, this._tripInfoView, RenderPosition.AFTERBEGIN);
  }

  _renderTrip() {
    renderList(this._siteTripElement);
    const tripList = this._siteTripElement.querySelector(`.trip-events__list`);

    if (this._tripPoints.length === 0) {
      this._renderEmptyTripList();
    } else {
      this._renderSortMenu();
      this._renderTripInfo();
    }

    for (let i = 0; i < this._tripPoints.length; i++) {
      this._renderPoint(tripList, this._tripPoints[i]);
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
}

export {
  TripPresenter
};
