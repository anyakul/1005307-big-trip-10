import {makeTemplateGenerator} from './generator';
import {formatTime, formatDuration} from '../../utils/date';
import {formatTypeWithPreposition} from '../../utils/type';

const OFFERS_TRUNCATE = 3;

const truncateOffers = (offers) =>
  offers.length > OFFERS_TRUNCATE
    ? offers.slice(0, OFFERS_TRUNCATE)
    : offers;

const createTypeTemplate = ({type}) => (
  `<div class="event__type">
    <img 
      class="event__type-icon" 
      width="42" 
      height="42" 
      src="img/icons/${type}.png" 
      alt="Event type icon"
    >
  </div>`
);

const createTitleTemplate = ({ type, destination }) => (
  `<h3 class="event__title">${formatTypeWithPreposition(type)} ${destination.name}</h3>`
);

const createPriceTemplate = ({price}) => (
  `<p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>`
);

const createOfferTemplates = makeTemplateGenerator(({title, price}) => (
  `<ul class="event__selected-offers">
    <li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>
  </ul>`
));

const createOffersTemplate = ({offers}) => (
  `<h4 class="visually-hidden">Offers:</h4>
   <ul class="event__selected-offers">
     ${createOfferTemplates(truncateOffers(offers))}
   </li>
  </ul>`
);

const createScheduleTemplate = ({startDate, endDate}) => (
  `<div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${startDate.toISOString()}">${formatTime(startDate)}</time>
      &mdash;
      <time class="event__end-time" datetime="${endDate.toISOString()}">${formatTime(endDate)}</time>
    </p>
    <p class="event__duration">${formatDuration(endDate - startDate)}</p>
  </div>`
);

const createEventCardTemplate = (eventItem) => (
  `<li class="trip-events__item">
    <div class="event">
      ${createTypeTemplate(eventItem)}
      ${createTitleTemplate(eventItem)}
      ${createScheduleTemplate(eventItem)}
      ${createPriceTemplate(eventItem)}
      ${createOffersTemplate(eventItem)}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`
);

export {createEventCardTemplate};
