import {Observer} from "../util/observer.js";
import dayjs from "dayjs";

class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._offers = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  setOffers(updateType, offers) {
    this._offers = offers.slice();
    this._notify(updateType, offers);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          destination: point.destination.name,
          startDateTime: dayjs(point.date_from),
          endDateTime: dayjs(point.date_to),
          price: point.base_price,
          destinationInfo: {
            description: point.destination.description.split(),
            photos: point.destination.pictures.map((picture) => picture.src)
          },
          isFavorite: point.is_favorite === true ? `event__favorite-btn--active` : ``,
        }
    );

    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;
    delete adaptedPoint.base_price;

    return adaptedPoint;
  }

  static adaptToServer(point) {

    const getArrayOfObjects = () => {
      let array = [];
      for (const photo of point.destinationInfo.photos) {
        let object = {
          "src": photo,
          "description": ``
        };
        array.push(object);
      }
      return array;
    };

    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "destination": {
            "name": point.destination,
            "description": point.destinationInfo.description.join(),
            "pictures": getArrayOfObjects()
          },
          "date_from": dayjs(`${point.startDateTime}`).toISOString(),
          "date_to": dayjs(`${point.endDateTime}`).toISOString(),
          "base_price": point.price,
          "is_favorite": point.isFavorite === `event__favorite-btn--active` ? true : false,
        }
    );

    delete adaptedPoint.startDateTime;
    delete adaptedPoint.endDateTime;
    delete adaptedPoint.price;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.destinationInfo;

    return adaptedPoint;
  }
}

export {
  Points
};
