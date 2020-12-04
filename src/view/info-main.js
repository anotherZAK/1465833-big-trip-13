import {Abstract as AbstractView} from "./abstract";

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
    let begimEndDates = [];
    if (tripPoints.length) {
      begimEndDates.push(tripPoints[0].endDateTime.format(`DD`), tripPoints[tripPoints.length - 1].startDateTime.format(`MMM DD`));
    }
    return begimEndDates.reverse().join(`&nbsp;&mdash;&nbsp;`);
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

class TripInfo extends AbstractView {
  constructor(tripPoints) {
    super();
    this._tripPoints = tripPoints;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripPoints);
  }
}

export {TripInfo};
