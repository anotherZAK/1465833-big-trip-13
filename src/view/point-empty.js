import {Abstract as AbstractView} from "./abstract.js";

const createEmptyPointListTemplate = () => {
  return `
    <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
};

class EmptyList extends AbstractView {

  getTemplate() {
    return createEmptyPointListTemplate();
  }
}

export {
  EmptyList
};
