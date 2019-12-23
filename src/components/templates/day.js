// Информация о дне
import {makeTemplateGenerator} from './generator';

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

const createBoardTemplate = (events) => (
  `<ul class="trip-days">
    ${createDayTemplates(events)}
  </ul>`
);

export {createBoardTemplate};
