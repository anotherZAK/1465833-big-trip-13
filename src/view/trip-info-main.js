const createTripInfoTemplate = (trip) => {

  /**
   * получает массив, содержащий полный маршрут поездки
   * @return {Array} - массив с данными
   */
  const getFullRoute = () => {
    let fullRoute = [];
    for (const tripItem of trip) {
      fullRoute.push(tripItem.destination);
    }
    return fullRoute.reverse();
  };

  /**
   * получает массив, содержащий дату начала и конца поездки
   * @return {Array} - массив с данными
   */
  const getBeginEndDate = () => {
    return [trip[0].endDateTime.format(`DD`), trip[trip.length - 1].startDateTime.format(`MMM DD`)].reverse();
  };

  /**
   * получает полную стоимость поездки
   * @return {number} - стоимость поездки
   */
  const getFullPrice = () => {
    let tripPrice = null;
    let addPrice = null;
    for (const tripItem of trip) {
      tripPrice += tripItem.price;
      for (const itemOffer of tripItem.offers) {
        addPrice += itemOffer.price;
      }
    }
    return tripPrice + addPrice;
  };

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getFullRoute().join(` &mdash; `)}</h1>

    <p class="trip-info__dates">${getBeginEndDate().join(`&nbsp;&mdash;&nbsp;`)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getFullPrice()}</span>
  </p>
  </section>`;
};

export {createTripInfoTemplate};
