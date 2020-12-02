import {createElement} from "../util.js";

const createTripInfoTemplate = (tripPoints) => {

  /**
   * получает массив, содержащий полный маршрут поездки
   * @return {Array} - массив с данными
   */
  const getFullRoute = () => {
    let fullRoute = [];
    for (const tripItem of tripPoints) {
      fullRoute.push(tripItem.destination);
    }
    return fullRoute.reverse().join(` &mdash; `);
  };

  /**
   * получает массив, содержащий дату начала и конца поездки
   * @return {Array} - массив с данными
   */
  const getBeginAndEndDate = () => {
    return [tripPoints[0].endDateTime.format(`DD`), tripPoints[tripPoints.length - 1].startDateTime.format(`MMM DD`)].reverse().join(`&nbsp;&mdash;&nbsp;`);
  };

  /**
   * получает полную стоимость поездки
   * @return {number} - стоимость поездки
   */
  const getFullPrice = () => {
    let tripPrice = null;
    let addPrice = null;
    for (const tripItem of tripPoints) {
      tripPrice += tripItem.price;
      for (const itemOffer of tripItem.offers) {
        addPrice += itemOffer.price;
      }
    }
    return tripPrice + addPrice;
  };

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getFullRoute()}</h1>

    <p class="trip-info__dates">${getBeginAndEndDate()}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullPrice()}</span>
  </p>
  </section>`;
};

class TripInfo {
  constructor(tripPoints) {
    this._tripPoints = tripPoints;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripPoints);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export {TripInfo};
