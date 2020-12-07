// import flatpickr from "flatpickr";
import {TripInfo} from "./view/info-main.js";
import {SiteMenu} from "./view/site-menu.js";
import {SiteFilters} from "./view/event-filters.js";
import {SortMenu} from "./view/sort-menu.js";
import {NewPoint} from "./view/event.js";
import {PointForm} from "./view/new-edit-event.js";
import {EmptyList} from "./view/event-empty.js";
import {generateUniversalTripPoint} from "./mock/point.js";
import {sortCategories} from "./model/sort-categories.js";
import {filterCategories} from "./model/filter-categories.js";
import {modificationHtml, render, RenderPosition} from "./util/render.js";

const TRIP_ITEMS_NUMBER = 15;

const tripMainElement = document.querySelector(`.trip-main`);

const siteMenuElement = document.querySelector(`.trip-controls`);
const menuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const filtersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

const siteTripElement = document.querySelector(`.trip-events`);
const tripTitle = siteTripElement.querySelector(`h2`);

const tripPoints = new Array(TRIP_ITEMS_NUMBER).fill().map(generateUniversalTripPoint);
const sortMenuView = new SortMenu(sortCategories);
const siteMenuView = new SiteMenu();
const tripInfoView = new TripInfo(tripPoints);
const siteFiltersView = new SiteFilters(filterCategories);
const emptyListView = new EmptyList();

/**
 * отрисовывает DOM элементы, относящиеся к контенту с точками маршрута
 */
const renderEventField = () => {
  /**
   * отрисовывает DOM элементы - точки маршрута и форму их редактирования
   * @param {Object} pointListElement -  DOM элемент, относительно которого будет отрисован новые DOM элементы
   * @param {Object} point - данные точки маршрута
   */
  const renderPoint = (pointListElement, point) => {
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
  };

  modificationHtml(siteTripElement);
  const tripList = siteTripElement.querySelector(`.trip-events__list`);

  if (TRIP_ITEMS_NUMBER === 0) {
    render(siteTripElement, emptyListView, RenderPosition.AFTER);
  } else {
    render(tripTitle, sortMenuView, RenderPosition.AFTER);
    render(tripMainElement, tripInfoView, RenderPosition.AFTERBEGIN);
  }

  for (let i = 0; i < tripPoints.length; i++) {
    renderPoint(tripList, tripPoints[i]);
  }
};

render(menuTitle, siteMenuView, RenderPosition.AFTER);
render(filtersTitle, siteFiltersView, RenderPosition.AFTER);
renderEventField();

// const dateTimeInput = siteTripElement.querySelector(`.event__input--time`);
// flatpickr(dateTimeInput, {
//   dateFormat: `d/m/y H:i`,
//   enableTime: true,
// });
