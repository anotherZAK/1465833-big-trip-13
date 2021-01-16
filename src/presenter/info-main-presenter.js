import {TripInfo} from "../view/info-main.js";
import {render, replace, remove} from "../util/render.js";

class InfoMainPresenter {
  constructor(allTrip, infoMainContainer) {
    this._allTrip = allTrip;
    this._infoMainContainer = infoMainContainer;

    this._currentInfoMain = null;
    this._infoMain = null;
  }

  init(points) {
    const prevInfoMain = this._infoMain;

    this._infoMain = new TripInfo(points);

    if (prevInfoMain === null) {
      render(this._infoMainContainer, this._infoMain);
      return;
    }

    replace(this._infoMain, prevInfoMain);
    remove(prevInfoMain);
  }

  destroy() {
    if (this._infoMain === null) {
      return;
    }

    remove(this._infoMain);
    this._infoMain = null;
  }
}

export {
  InfoMainPresenter
};
