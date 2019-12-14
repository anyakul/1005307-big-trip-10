// Информация о дне
import {showDate} from '../utils';
import AbstractComponent from './abstract-component.js';

const createDayInfoTemplate = (card) => {
  const {dateFromUnix} = card;
  const date = showDate(dateFromUnix);

  return (
    `<div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">${date}</time>
    </div>`
  );
};

export default class DayInfoComponent extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createDayInfoTemplate(this._card);
  }
}
