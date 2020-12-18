import {NewPoint} from "../view/point.js";
import {PointForm} from "../view/new-edit-point.js";
import {remove, replace, render} from "../util/render.js";
import {Favorite} from "../mock/point.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

class PointPresenter {
  constructor(pointListElement, point, changeData, changeMode) {
    this._point = point;
    this._pointListElement = pointListElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handlePointClick = this._handlePointClick.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    const prevPointComponent = this._pointComponent;
    const prevEditComponent = this._pointEditComponent;

    this._pointComponent = new NewPoint(point);
    this._pointEditComponent = new PointForm(point, `edit`);

    this._pointComponent.setPointClickHandler(this._handlePointClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setPointClickHandler(this._handleFormSubmit);

    if (prevPointComponent === null || prevEditComponent === null) {
      render(this._pointListElement, this._pointComponent);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevEditComponent);
    }

    remove(prevPointComponent);
    remove(prevEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }

  _replacePointToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
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
  }

  _handleFormSubmit(point) {
    this._replaceFormToPoint();
    this._changeData(point);
  }

  _handleFavoriteClick(point) {
    const inverseFavorite = !point.isFavorite;
    this._point.isFavorite = Favorite[String(inverseFavorite)];
    this._changeData(
        Object.assign(
            {},
            point,
            {
              isFavorite: Favorite[String(inverseFavorite)]
            }
        )
    );
  }
}

export {
  PointPresenter
};
