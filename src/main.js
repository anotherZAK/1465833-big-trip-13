import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFiltersTemplate} from "./view/site-filters.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMenuElement = document.querySelector(`.trip-main__trip-controls`);
const siteMenuTitle = siteMenuElement.querySelector(`h2:nth-child(1)`);
const siteFiltersTitle = siteMenuElement.querySelector(`h2:nth-child(2)`);

render(siteMenuTitle, createSiteMenuTemplate(), `afterend`);
render(siteFiltersTitle, createSiteFiltersTemplate(), `afterend`);
