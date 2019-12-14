import {showTime, showFullDate} from '../utils';
import {eventTypeToPreposition} from '../constants';
import AbstractComponent from './abstract-component.js';

// Шаблон карточки события
const generateExtraServicesMarkup = (options) => {
  return Array.from(options)
    .map((offers) => {
      const {title, price} = offers;

      return (
        `<li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`
      );
    })
    .join(`\n`);
};

const getEventPreposition = function (type) {
  return eventTypeToPreposition[type];
};

export const createCardTemplate = (card) => {
  const {type, destination, dateFromUnix, dateToUnix, basePrice, offers} = card;
  const diffTimeUnix = dateToUnix - dateFromUnix;
  let services = generateExtraServicesMarkup(offers);
  let timeFrom = showTime(dateFromUnix);
  let timeTo = showTime(dateToUnix);
  let diffTime = showTime(diffTimeUnix);
  let fullDateFrom = showFullDate(dateFromUnix);
  let fullDateTo = showFullDate(dateToUnix);
  let preposition = getEventPreposition(type);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="./img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${preposition} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${fullDateFrom}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${fullDateTo}">${timeTo}</time>
          </p>
          <p class="event__duration">${diffTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">${services}</ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class EventCardComponent extends AbstractComponent {
  constructor(card) {
    super();

    this._card = card;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }
}
