import {EmptyList} from "../view/event-empty.js";
import {SortMenu} from "../view/sort-menu.js";
import {TripInfo} from "../view/info-main.js";
import {NewPoint} from "../view/event.js";
import {PointForm} from "../view/new-edit-event.js";
import {renderList, render, RenderPosition} from "../util/render.js";


class Trip {
  constructor(sortCategories, tripPoints) {
    this._tripMainElement = document.querySelector(`.trip-main`);
    this._siteTripElement = document.querySelector(`.trip-events`);
    this._tripTitle = this._siteTripElement.querySelector(`h2`);

    this._sortCategories = sortCategories;
    this._tripPoints = tripPoints;

    this._emptyListView = new EmptyList();
    this._sortMenuView = new SortMenu(this._sortCategories);
    this._tripInfoView = new TripInfo(this._tripPoints);
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
    const pointComponent = new NewPoint(point);
    const pointEditComponent = new PointForm(point, `edit`);

    /**
     * меняет между собой DOМ элементы
    */
    const replacePointToForm = () => {
      pointComponent.getElement().replaceWith(pointEditComponent.getElement());
    };

    /**
    * меняет между собой DOМ элементы
    * @param {Object} evt - объект-событие
    */
    const replaceFormToPoint = () => {
      pointEditComponent.getElement().replaceWith(pointComponent.getElement());
    };

    /**
    * при нажатии клавиши Escape меняет между собой DOМ элементы и удаляет данный обработчик
    * @param {Object} evt - объект-событие
    */
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToPoint(evt);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    pointComponent.setPointClickHandler(() => {
      replacePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() =>{
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    pointEditComponent.setPointClickHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(pointListElement, pointComponent, RenderPosition.AFTERBEGIN);
  }
}

export {
  Trip
};
