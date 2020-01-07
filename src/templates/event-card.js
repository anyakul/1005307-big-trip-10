import {makeTemplateGenerator} from './generator';
import {getCorrectPreposition} from '../components/event-card';
import {generateTimeInterval, castFullDateFormat, castTimeFormat} from '../utils/date';

const generateExtraServicesMarkup = ({title, price, accepted}) => {
  return (
    accepted ? (
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
    ) : ``
  );
};

const createExtraServicesMarkup = makeTemplateGenerator(generateExtraServicesMarkup);

const createCardTemplate = ({type, basePrice, destination, dateFrom, dateTo}) => {
  const castDateFrom = castTimeFormat(dateFrom);
  const castDateTo = castTimeFormat(dateTo);
  const fullDateFrom = castFullDateFormat(dateFrom);
  const fullDateTo = castFullDateFormat(dateTo);
  const preposition = getCorrectPreposition(type);

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
          ${castDateFrom}
        </time>
        &mdash;
        <time
          class="event__end-time"
          datetime="${fullDateTo}"
          >
          ${castDateTo}
        </time>
      </p>
      <p class="event__duration">
        ${generateTimeInterval(dateFrom, dateTo)}
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
  const extraServices = createExtraServicesMarkup(events.offers);
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
