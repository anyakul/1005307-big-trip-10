// Информация о дне
import {makeTemplateGenerator} from './generator';
import {MonthNames} from '../utils/date';
/*
const createDayInfoTemplate = ({dayNumber, date}) => (
  `<div class="day__info">
    <span class="day__counter">${dayNumber}</span>
    <time class="day__date" datetime="2019-03-18">${date}</time>
  </div>`
);

const createDayTemplate = (events) => (
  `<li class="trip-days__item day">
    ${createDayInfoTemplate(events)}
    <ul class="trip-events__list"></ul>
  </li>`
);

const createDayTemplates = makeTemplateGenerator(createDayTemplate);
*/
const createDayTemplate = (tripDays) => {
  tripDays.map((day, i) => {
    const getTripDay = () => {
      const dayDate = day[0].dateFromUnix;
      return `${MonthNames[dayDate.getMonth()]} ${dayDate.getDate()}`;
    };
    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">1</span>
          <time class="day__date" datetime="22/00">22/00</time>
        </div>
        <ul class="trip-events__list" data-date="22/00">
        </ul>
      </li>`
    );
  })
}

const createBoardTemplate = (tripDays) => (
  `<ul class="trip-days">
    ${createDayTemplate(tripDays)}
  </ul>`
);

export {createBoardTemplate};
