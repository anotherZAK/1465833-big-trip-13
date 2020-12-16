import {Abstract} from "../view/abstract.js";

const RenderPosition = {
  AFTER: `after`,
  AFTERBEGIN: `afterbegin`
};

/**
 * Отрисовывает DOM элементы на странице
 * @param {Object} container - DOM элемент, относительно которого будет отрисован новый элемент
 * @param {Object} child - компонент
 * @param {String} place - местоположение отрисовываемого DOM элемента относительно существующего DOM элемента
 */
const render = (container, child, place = RenderPosition.AFTERBEGIN) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTER:
      container.after(child);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
  }
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

/**
 * формирует DOM элемент
 * @param {String} template - HTML-код
 * @return {Object} - DOM элемент
 */
const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

export {
  RenderPosition,
  render,
  createElement,
  remove,
  replace
};
