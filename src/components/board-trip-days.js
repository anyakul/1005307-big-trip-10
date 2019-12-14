// Список дней
import AbstractComponent from './abstract-component.js';

const createBoardTripDaysTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class BoardTripDaysComponent extends AbstractComponent {
  getTemplate() {
    return createBoardTripDaysTemplate();
  }
}
