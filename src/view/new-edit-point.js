import {Smart} from "./smart.js";
import {typeDescriptions, Destination, offers, offersFromPointType} from "../mock/point.js";


const createPointFormTemplate = (editTrip, eventKey = `new`) => {
  const {type, destination, price, destinationInfo: {description, photos}} = editTrip;

  let editFormExtraOptions = {
    priceValue: ``,
    buttomName: `Cancel`,
    buttonRollupTemplate: ``
  };

  if (eventKey === `edit`) {
    editFormExtraOptions.priceValue = price;
    editFormExtraOptions.buttomName = `Delete`;
    editFormExtraOptions.buttonRollupTemplate = `
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * формирует строку, элементами которого является тип поездки
   * @param {Array} typesOfTrip - исходные массив с данными
   * @return {String} - строка элементами которого является тип поездки
   */
  const createEventTypeItemsTemplate = (typesOfTrip) => {
    let typeEventContainer = [];
    for (const typeDescription of typesOfTrip) {
      typeEventContainer.push(`
      <div class="event__type-item">
        <input id="event-type-${typeDescription.type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeDescription.type}">
        <label class="event__type-label  event__type-label--${typeDescription.type}" for="event-type-${typeDescription.type}-1">${typeDescription.type}</label>
      </div>
      `);
    }
    return typeEventContainer.join(` `);
  };

  /**
  * формирует массив, элементами которого является дополнительные опции поездки
  * @param {Array} data - исходные массив с данными
  * @return {Array} - массив элементами которого является дополнительные опции поездки
  */
  const createEventOfferItemsTemplate = (data) => {
    const offerEventContainer = [];
    for (const offer of data.offers) {
      if (offer) {
        offerEventContainer.push(`
        <div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}">
          <label class="event__offer-label" for="event-offer-${offer.type}-1">
            <span class="event__offer-title">${offer.option}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `);
      }
    }
    return offerEventContainer;
  };

  /**
   * формирует шаблон блока с дополнительными опциями поездки
   * @param {Array} container - массив с дополнительными опции поездки
   * @return {String} - блок кода с дополнительными опциями поездки
   */
  const createEventOfferBlockTemplate = (container) => {
    let offersTemplate = ``;
    if (container.length) {
      offersTemplate = `
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${container.join(` `)}
        </div>
    `;
    }
    return offersTemplate;
  };

  /**
   * формирует шаблон блока с описанием пункта назначения и фотографиями
   * @param {Array} container - массив с описаниями пункта назначения
   * @return {String} - блок кода с описанием пункта назначения и фотографиями
   */
  const createDestinationBlockTemplate = (container) => {
    let destinationTemplate = ``;
    const photosContainer = [];
    if (container.length) {
      for (const photo of photos) {
        if (photo) {
          photosContainer.push(`
            <img class="event__photo" src="${photo}" alt="Event photo">
        `);
        }
      }
      destinationTemplate = `
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${container}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photosContainer.join(` `)}
            </div>
          </div>
        </section>
    `;
    }
    return destinationTemplate;
  };

  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createEventTypeItemsTemplate(typeDescriptions)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${editFormExtraOptions.priceValue}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${editFormExtraOptions.buttomName}</button>
          ${editFormExtraOptions.buttonRollupTemplate}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            ${createEventOfferBlockTemplate(createEventOfferItemsTemplate(editTrip))}
          </section>
            ${createDestinationBlockTemplate(description)}
        </section>
      </form>
    </li>
  `;
};

class PointForm extends Smart {
  constructor(editTrip, eventKey = `new`) {
    super();
    this._editTrip = editTrip;
    this._eventKey = eventKey;
    this._data = PointForm.parsePointToData(editTrip);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);

    this._setInternalHandler();
  }

  getTemplate() {
    return createPointFormTemplate(this._data, this._eventKey);
  }

  restoreHandler() {
    this._setInternalHandler();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setPointClickHandler(this._callback.formClick);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointForm.parseDataToPoint(this._data));
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.formClick();
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    const index = 38;
    if (evt.target.classList.value.includes(`event__type-label`)) {
      this.updateData({
        type: evt.target.classList.value.slice(index),
        offers: offers.slice(0, offersFromPointType(evt.target.classList.value.slice(index)))
      });
    }
  }

  _destinationInputHandler(evt) {
    evt.preventDefault();
    let flag = true;
    const sourceData = Object.assign({}, this._editTrip.destinationInfo);
    const index = Destination.findIndex((item) => {
      return item.point === evt.target.value;
    });

    if (index !== -1) {
      flag = false;
      sourceData.description = Destination[index].description;
      sourceData.photos = Destination[index].photos;
    }
    this.updateData({
      destination: evt.target.value,
      destinationInfo: {
        description: sourceData.description,
        photos: sourceData.photos
      }
    }, flag);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setPointClickHandler(callback) {
    this._callback.formClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollUpClickHandler);
  }

  _setInternalHandler() {
    this.getElement().querySelector(`.event__type-group`).addEventListener(`click`, this._typeToggleHandler);
    this.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, this._destinationInputHandler);
  }
}

export {
  PointForm
};
