import {NewPoint} from "../view/event.js";
import {PointForm} from "../view/new-edit-event.js";
import {render, RenderPosition} from "../util/render.js";

class PointPresenter {
  constructor(pointListElement, point) {
    this._point = point;
    this._pointListElement = pointListElement;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init() {
    this._pointComponent = new NewPoint(this._point);
    this._pointEditComponent = new PointForm(this._point, `edit`);

    this._pointComponent.setPointClickHandler(this._handlePointClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setPointClickHandler(this._handleFormSubmit);

    render(this._pointListElement, this._pointComponent, RenderPosition.AFTERBEGIN);
  }

  _replacePointToForm() {
    this._pointComponent.getElement().replaceWith(this._pointEditComponent.getElement());
  }

  _replaceFormToPoint() {
    this._pointEditComponent.getElement().replaceWith(this._pointComponent.getElement());
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToPoint(evt);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handlePointClick() {
    this._replacePointToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

export {
  PointPresenter
};
