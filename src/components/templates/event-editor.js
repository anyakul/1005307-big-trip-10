import {TRANSFER_EVENTS, ACTIVITY_EVENTS} from '../../const';
import {formatTypeWithPreposition} from '../../utils/type';
import {formatDateTime} from '../../utils/date';
import {makeTemplateGenerator} from './generator';

const createTypeItemTemplate = (type, id, isChecked = false) => (
  `<div class="event__type-item">
    <input
      id="event-type-${type}-${id}"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value="${type}"
      ${isChecked ? `checked` : ``}
    >
    <label class="event__type-label event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
  </div>`
);

const createTypeItemTemplates = (types, {id, type}) => types
  .map((eventType) => createTypeItemTemplate(eventType, id, eventType === type))
  .join(``);

const createEventListTemplate = (eventItem) => (
  `<div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Transfer</legend>
      ${createTypeItemTemplates(TRANSFER_EVENTS, eventItem)}
    </fieldset>
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Activity</legend>
      ${createTypeItemTemplates(ACTIVITY_EVENTS, eventItem)}
    </fieldset>
  </div>`
);

const createTypeImageTemplate = (type) => (
  `<img
    class="event__type-icon"
    width="17"
    height="17"
    src="img/icons/${type}.png"
    alt="Event type icon"
  >`
);

const createTypeTemplate = ({id, type}) => (
  `<label class="event__type event__type-btn" for="event-type-toggle-${id}">
    <span class="visually-hidden">Choose event type</span>
    ${createTypeImageTemplate(type)}
  </label>
  <input class="event__type-toggle visually-hidden" id="event-type-toggle-${id}" type="checkbox" >`
);

const createPriceTemplate = ({id, price}) => (
  `<div class="event__field-group event__field-group--price">
    <label class="event__label" for="event-price-${id}">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input
      class="event__input event__input--price"
      id="event-price-${id}"
      type="number"
      name="event-price"
      value="${price}"
      required
      min="0"
    >
  </div>`
);

const createScheduleTemplate = ({id, startDate, endDate}) => (
  `<div class="event__field-group event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${id}">From</label>
    <input
      class="event__input event__input--time"
      id="event-start-time-${id}"
      type="text"
      name="event-start-time"
      value="${formatDateTime(startDate)}"
    >
    &mdash;
    <label class="visually-hidden" for="event-end-time-${id}">To</label>
    <input
      class="event__input event__input--time"
      id="event-end-time-${id}"
      type="text"
      name="event-end-time"
      value="${formatDateTime(endDate)}"
    >
  </div>`
);

const createFavoriteButtonTemplate = ({id, isFavorite}) => (
  `<input
    id="event-favorite-${id}"
    class="event__favorite-checkbox visually-hidden"
    type="checkbox"
    name="event-favorite"
    ${isFavorite ? `checked` : ``}
  >
  <label class="event__favorite-btn" for="event-favorite-${id}">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </label>`
);

const createTypeOptionTemplates = makeTemplateGenerator(({name}) => (
  `<option value="${name}">${name}</option>`
));

const createDestinationTemplate = ({id, type, destination}, destinations) => (
  `<div class="event__field-group event__field-group--destination">
    <label class="event__label event__type-output" for="event-destination-1">
      ${formatTypeWithPreposition(type)}
    </label>
    <input
      class="event__input event__input--destination"
      id="event-destination-${id}"
      type="text"
      name="event-destination"
      value="${destination.name}"
      list="destination-list-${id}"
      required
    >
    <datalist id="destination-list-${id}">
      ${createTypeOptionTemplates(destinations)}
    </datalist>
  </div>`
);

const createPhotoTemplates = makeTemplateGenerator(({src, description}) => (
  `<img class="event__photo" src="${src}" alt="${description}">`
));

const createDestinationSectionTemplate = ({description, pictures}) => (
  `<section class="event__section event__section--destination">
    <h3 class="event__section-title event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createPhotoTemplates(pictures)}
      </div>
    </div>
  </section>`
);

const createOfferSelectorTemplates = makeTemplateGenerator(({title, price, isChecked = false}, id) => (
  `<div class="event__offer-selector">
    <input
      class="event__offer-checkbox visually-hidden"
      id="event-offer-${id}"
      type="checkbox"
      name="${title}"
      value="${price}"
      ${isChecked ? `checked` : ``}
    >
    <label class="event__offer-label" for="event-offer-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </label>
  </div>`
));

const createOffersTemplate = (offers) => (
  `<section class="event__section event__section--offers">
    <h3 class="event__section-title event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOfferSelectorTemplates(offers)}
    </div>
  </section>`
);

const createDetailsTemplate = (destination, offers) => (
  `<section class="event__details">
    ${offers.length > 0 ? createOffersTemplate(offers) : ``}
    ${createDestinationSectionTemplate(destination)}
  </section>`
);

const createSaveButton = () => (
  `<button class="event__save-btn btn btn--blue" type="submit">Save</button>`
);

export {
  createDestinationSectionTemplate,
  createDestinationTemplate,
  createDetailsTemplate,
  createEventListTemplate,
  createFavoriteButtonTemplate,
  createOfferSelectorTemplates,
  createOffersTemplate,
  createPriceTemplate,
  createSaveButton,
  createScheduleTemplate,
  createTypeTemplate,
};
