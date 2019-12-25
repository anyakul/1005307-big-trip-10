import {showDate} from '../utils/date';
import AbstractComponent from './abstract-component';

const createDayTemplate = (tripDays) => {
  return (tripDays.map((day, i) => {
    const dayDate = day[0].dateFromUnix;
    const date = showDate(dayDate);
    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${i + 1}</span>
          <time class="day__date" datetime="${date}">${date}</time>
        </div>
        <ul class="trip-events__list" data-date="${date}"></ul>
      </li>`
    );
  }).join(`\n`));
};

const createBoardTemplate = (tripDays) => (
  `<ul class="trip-days">${createDayTemplate(tripDays)}</ul>`
);

class DayComponent extends AbstractComponent {
  constructor(tripDays) {
    super();
    this._tripDays = tripDays;
  }

  getTemplate() {
    return createBoardTemplate(this._tripDays);
  }
}

export default DayComponent;
