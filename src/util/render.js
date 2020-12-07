const RenderPosition = {
  AFTER: `after`,
  AFTERBEGIN: `afterbegin`,
  BEFORE: `before`
};

/**
 * Добавляет новый элемент (ul) в раметку и назначает ему атрибут class
 * @param {Object} container - блок html кода, относительно которого будет отрисована разметка
 */
const modificationHtml = (container) => {
  const newList = document.createElement(`ul`);
  newList.classList.add(`trip-events__list`);
  container.append(newList);
};

/**
 * Отрисовывает DOM элементы на странице
 * @param {Object} container - DOM элемент, относительно которого будет отрисован новый элемент
 * @param {Object} element - функция, формирующая DOM элемент
 * @param {String} place - местоположение отрисовываемого DOM элемента относительно существующего DOM элемента
 */
const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTER:
      container.after(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFORE:
      container.before(element);
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

export {
  RenderPosition,
  modificationHtml,
  renderElement,
  createElement
};
