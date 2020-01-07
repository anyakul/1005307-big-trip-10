import AbstractComponent from './abstract-component';
import {castMonthDayFormat, castDateFormat} from '../utils/date';

const createDayBoardTemplate = (tripDays) => {
  return (tripDays.map((day, i) => {
    const dayDate = day[0].dateFrom;
    const monthDay = castMonthDayFormat(dayDate);
    const date = castDateFormat(dayDate);
    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${i + 1}</span>
          <time class="day__date" datetime="${date}">${monthDay}</time>
        </div>
        <ul class="trip-events__list" data-date="${date}"></ul>
      </li>`
    );
  }).join(`\n`));
};

const createDayBoardTemplates = (tripDays) => (
  `<ul class="trip-days">${createDayBoardTemplate(tripDays)}</ul>`
);

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

      if (prevCard && castDateFormat(eventItem.dateFrom) !== castDateFormat(prevCard.dateFrom)) {
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
