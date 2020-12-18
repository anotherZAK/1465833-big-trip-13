import {Abstract as AbstractView} from "./abstract.js";

const pointListTemplate = () => {
  return `
    <ul class="trip-events__list"></ul>
  `;
};

class PointList extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return pointListTemplate;
  }
}

export {
  PointList
};
