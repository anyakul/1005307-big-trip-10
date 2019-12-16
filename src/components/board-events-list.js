// Список событий дня
import AbstractComponent from './abstract-component.js';

const createBoardEventsListTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class BoardEventsListComponent extends AbstractComponent {
  getTemplate() {
    return createBoardEventsListTemplate();
  }
}
