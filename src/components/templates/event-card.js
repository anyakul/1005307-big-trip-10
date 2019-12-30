import {makeTemplateGenerator} from './generator';

const generateExtraServicesMarkup = ({title, price}) => (
  `<li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${price}</span>
  </li>`
);

const createExtraServicesMarkup = makeTemplateGenerator(generateExtraServicesMarkup);

const createCardTemplate = ({type, destinationName, time, basePrice, preposition}) => (
  `<div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="./img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type}
    ${preposition}
    ${destinationName}
  </h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${time.fullDateFrom}">${time.timeFrom}</time>
      &mdash;
      <time class="event__end-time" datetime="${time.fullDateTo}">${time.timeTo}</time>
    </p>
    <p class="event__duration">${time.diffTime}</p>
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
