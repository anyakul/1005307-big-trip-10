import {showDate} from '../utils/date';
import AbstractComponent from './abstract-component';

const generateTripDays = (events) => {
  let tripDays = [];
  let currentCards = [];

  events.forEach((eventItem, i) => {
    let prevCard = i > 0 ? events[i - 1] : null;

    if (prevCard && showDate(eventItem.dateFromUnix) !== showDate(prevCard.dateFromUnix)) {
      tripDays.push(currentCards);
      currentCards = [];
    }
    currentCards.push(eventItem);
    if (i === events.length - 1) {
      tripDays.push(currentCards);
    }
  });

  return tripDays;
};

const createDayBoardTemplate = (tripDays) => {
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

const createDayBoardTemplates = (tripDays) => (
  `<ul class="trip-days">${createDayBoardTemplate(tripDays)}</ul>`
);

class DayComponent extends AbstractComponent {
  constructor(tripDays) {
    super();
    this._tripDays = tripDays;
  }

  getTemplate() {
    return createDayBoardTemplates(this._tripDays);
  }
}

export default DayComponent;
export {generateTripDays};
