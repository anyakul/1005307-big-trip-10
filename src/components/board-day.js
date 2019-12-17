// Элемент списка день
import AbstractComponent from './abstract-component';

const createBoardDayTemplate = () => {
  return `<li class="trip-days__item day"></li>`;
};

export default class BoardDayComponent extends AbstractComponent {
  getTemplate() {
    return createBoardDayTemplate();
  }
}
