import {Abstract} from "../view/abstract";

const RenderPosition = {
  AFTER: `after`,
  AFTERBEGIN: `afterbegin`,
  BEFORE: `before`
};

/**
 * Добавляет новый DOM-элемент (ul) в раметку и назначает ему атрибут class
 * @param {Object} container - блок html кода, относительно которого будет отрисована разметка
 */
const renderList = (container) => {
  const newList = document.createElement(`ul`);
  newList.classList.add(`trip-events__list`);
  container.append(newList);
};

/**
 * Отрисовывает DOM элементы на странице
 * @param {Object} container - DOM элемент, относительно которого будет отрисован новый элемент
 * @param {Object} child - компонент
 * @param {String} place - местоположение отрисовываемого DOM элемента относительно существующего DOM элемента
 */
const render = (container, child, place) => {
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
    case RenderPosition.BEFORE:
      container.before(child);
      break;
  }
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
  renderList,
  render,
  createElement,
  remove
};
