import AbstractComponent from './abstract-component';
import {createDayBoardTemplates} from '../templates/day-board';
import {formatDate} from '../templates/date';

class DayComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
    this._tripDays = this._generateTripDays();
  }

  getTemplate() {
    return createDayBoardTemplates(this._tripDays);
  }

  _generateTripDays() {
    this._tripDays = [];
    this._currentCards = [];

    this._events.forEach((eventItem, i) => {
      let prevCard = i > 0 ? this._events[i - 1] : null;

      if (prevCard && formatDate(eventItem.dateFrom) !== formatDate(prevCard.dateFrom)) {
        this._tripDays.push(this._currentCards);
        this._currentCards = [];
      }
      this._currentCards.push(eventItem);
      if (i === this._events.length - 1) {
        this._tripDays.push(this._currentCards);
      }
    });

    return this._tripDays;
  }
}

export default DayComponent;
