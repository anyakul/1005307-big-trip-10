import {makeTemplateGenerator} from './generator';
import {getCorrectPreposition} from '../events';
import {
  formatDuration,
  formatTime,
  formatFullDate,
} from './date';

const OFFERS_TRUNCATE = 3;

const generateExtraServicesMarkup = ({title, price}) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">
        ${title}
      </span>
      &plus;
      &euro;&nbsp;
      <span class="event__offer-price">
        ${price}
      </span>
    </li>`
  );
};

const createExtraServicesMarkup = makeTemplateGenerator(generateExtraServicesMarkup);

const createCardTemplate = ({type, dateFrom, dateTo, basePrice, destination}) => {
  const dateFromInCard = formatTime(dateFrom);
  const dateToInCard = formatTime(dateTo);
  const fullDateFrom = formatFullDate(dateFrom);
  const fullDateTo = formatFullDate(dateTo);
  const preposition = getCorrectPreposition(type);
  const timeInterval = formatDuration(dateFrom, dateTo);

  return (
    `<div class="event__type">
      <img
        class="event__type-icon"
        width="42"
        height="42"
        src="./img/icons/${type}.png"
        alt="Event type icon"
      >
    </div>
    <h3 class="event__title">
      ${type}
      ${preposition}
      ${destination.name}
    </h3>
    <div class="event__schedule">
      <p class="event__time">
        <time
          class="event__start-time"
          datetime="${fullDateFrom}"
          >
          ${dateFromInCard}
        </time>
        &mdash;
        <time
          class="event__end-time"
          datetime="${fullDateTo}"
          >
          ${dateToInCard}
        </time>
      </p>
      <p class="event__duration">
        ${timeInterval}
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;
      <span class="event__price-value">
        ${basePrice}
      </span>
    </p>`
  );
};

const createEventCardTemplate = (events) => {
  const truncateOffers = (offers) =>
    offers.length > OFFERS_TRUNCATE
      ? offers.slice(0, OFFERS_TRUNCATE)
      : offers;
  const extraServices = createExtraServicesMarkup(truncateOffers(events.offers));
  const cardTemplate = createCardTemplate(events);

  return (
    `<li class="trip-events__item">
      <div class="event">
        ${cardTemplate}
        <h4 class="visually-hidden">
          Offers:
        </h4>
        <ul class="event__selected-offers">
          ${extraServices}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">
            Open event
          </span>
        </button>
      </div>
    </li>`
  );
};

export {createEventCardTemplate};
