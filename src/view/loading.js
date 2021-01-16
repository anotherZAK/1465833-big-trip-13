import {Abstract as AbstractView} from "./abstract.js";

const createNoTaskTemplate = () => {
  return `<p class="trip-loading">
    Loading...
  </p>`;
};

class Loading extends AbstractView {
  getTemplate() {
    return createNoTaskTemplate();
  }
}

export {
  Loading
};
