import {makeTemplateGenerator} from './generator';
import {showDateInCard} from '../event-card';

import {
  getEventType,
  OFFERS_TRUNCATE,
  Preposition} from '../events';

const truncateOffers = (offers) =>
  offers.length > OFFERS_TRUNCATE
    ? offers.slice(0, OFFERS_TRUNCATE)
    : offers;

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

const createCardTemplate = ({type, startDate, endDate, price, destination}) => {
  const dates = showDateInCard(startDate, endDate);
  

  
  const preposition = Preposition[getEventType(type)];

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
          datetime="${dates.fullDateFrom}"
          >
          ${dates.dateFromInCard}
        </time>
        &mdash;
        <time
          class="event__end-time"
          datetime="${dates.fullDateTo}"
          >
          ${dates.dateToInCard}
        </time>
      </p>
      <p class="event__duration">
        ${dates.timeInterval}
      </p>
    </div>
    <p class="event__price">
      &euro;&nbsp;
      <span class="event__price-value">
        ${price}
      </span>
    </p>`
  );
};

const createEventCardTemplate = (events) => {
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
