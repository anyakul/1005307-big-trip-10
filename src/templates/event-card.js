import {makeTemplateGenerator} from './generator';
import {getCorrectPreposition} from '../components/event-card';
import {generateTimeInterval, castFullDateFormat, castTimeFormat} from '../utils/date';

const generateExtraServicesMarkup = ({title, price}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`
);

const createExtraServicesMarkup = makeTemplateGenerator(generateExtraServicesMarkup);

const createCardTemplate = ({type, basePrice, destination, dateFrom, dateTo}) => (
  `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="./img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type}
    ${getCorrectPreposition(type)}
    ${destination.name}
  </h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${castFullDateFormat(dateFrom)}">${castTimeFormat(dateFrom)}</time>
      &mdash;
      <time class="event__end-time" datetime="${castFullDateFormat(dateTo)}">${castTimeFormat(dateTo)}</time>
    </p>
    <p class="event__duration">${generateTimeInterval(dateFrom, dateTo)}</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>`
);

const createEventCardTemplate = (events) => (
  `<li class="trip-events__item">
    <div class="event">
      ${createCardTemplate(events)}
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">${createExtraServicesMarkup(events.offers)}</ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
);

export {createEventCardTemplate};
