import {Abstract as AbstractView} from "./abstract.js";

class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateElement() {
    let prevElement = this.getElement();
    this.removeElement();

    const newElement = this.getElement();
    prevElement.replaceWith(newElement);

    this.restoreHandler();
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: resetHandlers`);
  }

  static parsePointToData(tripPoint) {
    return Object.assign(
        {},
        tripPoint
    );
  }

  static parseDataToPoint(tripPoint) {
    tripPoint = Object.assign({}, tripPoint);

    return tripPoint;
  }
}

export {
  Smart
};
