import {makeTemplateGenerator} from './generator';
import {castFullDateFormat} from '../utils/date';
import {EventTypeTransport,
  EventTypePlace,
  createPhotos,
  getCorrectPreposition,
}
  from '../components/event-card';
import {createTypes} from '../utils/common';

const createTripTypeImageTemplate = ({type}) => (
  `<img
    class="event__type-icon"
    width="17"
    height="17"
    src="img/icons/${type}.png"
    alt="Event type icon">`
);

const createTripTypeTransportTemplate = ({type, name, isChecked}) => (
  `<div class="event__type-item">
    <input
      id="event-type-${type}-1"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value="${type}"
      ${isChecked ? `checked` : ``}>
    <label
      class="event__type-label event__type-label--${type}"
      for="event-type-${type}-1">
      ${name}
    </label>
  </div>`
);

const createTripTypePlacesTemplate = ({type, name, isChecked}) => (
  `<div class="event__type-item">
    <input
      id="event-type-${type}-1"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value="${name}"
      ${isChecked ? `checked` : ``}>
    <label
      class="event__type-label event__type-label--${type}"
      for="event-type-${type}-1">
      ${name}
    </label>
  </div>`
);

const createTypeTemplate = (events) => (
  `<div class="event__type-wrapper">
    <label
      class="event__type
      event__type-btn"
      for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      ${createTripTypeImageTemplate(events)}
    </label>
    <input
      class="event__type-toggle  visually-hidden"
      id="event-type-toggle-1"
      type="checkbox">
    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${createTripTypeTransportTemplates(createTypes(events.type, EventTypeTransport))}
      </fieldset>
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${createTripTypePlacesTemplates(createTypes(events.type, EventTypePlace))}
      </fieldset>
    </div>
  </div>`
);

const createDestinationFieldGroup = ({type, destination}) => (
  `<div class="event__field-group event__field-group--destination">
    <label class="event__label event__type-output" for="event-destination-1">
    ${type}
    ${getCorrectPreposition(type)}
    </label>
    <input
      class="event__input event__input--destination"
      id="event-destination-1"
      type="text"
      name="event-destination"
      value="${destination.name}"
      list="destination-list-1">
    <datalist id="destination-list-1">
      <option
        value="${destination.name}">
      </option>
    </datalist>
  </div>`
);

const createTimeTemplate = ({dateFrom, dateTo}) => (
  `<div class="event__field-group  event__field-group--time">
    <label
      class="visually-hidden"
      for="event-start-time-1">
      From
    </label>
    <input
      class="event__input  event__input--time"
      id="event-start-time-1"
      type="text"
      name="event-start-time"
      value="${castFullDateFormat(dateFrom)}">
      &mdash;
    <label
      class="visually-hidden"
      for="event-end-time-1">
      To
    </label>
    <input
      class="event__input  event__input--time"
      id="event-end-time-1"
      type="text"
      name="event-end-time"
      value="${castFullDateFormat(dateTo)}">
  </div>`
);

const createPriceTemplate = ({basePrice}) => (
  `<div class="event__field-group  event__field-group--price">
    <label
      class="event__label"
      for="event-price-1">
      <span class="visually-hidden">
        Price
      </span>
      &euro;
    </label>
    <input
      class="event__input event__input--price"
      id="event-price-1"
      type="text"
      name="event-price"
      value="${basePrice}">
  </div>`
);

const createButtonsTemplate = ({isFavorite}) => (
  `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <input
    id="event-favorite-1"
    class="event__favorite-checkbox visually-hidden"
    type="checkbox"
    name="event-favorite"
    ${isFavorite ? `checked` : ``}>
  <label class="event__favorite-btn" for="event-favorite-1">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </label>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
);

const createOfferTemplate = ({title, price, accepted}) => (
  `<div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-luggage-1"
      type="checkbox"
      name="event-offer-luggage"
      ${accepted ? `checked` : ``}>
    <label
      class="event__offer-label"
      for="event-offer-luggage-1">
      <span
        class="event__offer-title">
        ${title}
      </span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">
        ${price}
      </span>
    </label>
  </div>`
);

const createOffersTemplate = (events) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOfferTemplates(events.offers)}
    </div>
  </section>`
);

const createDestinationDescriptionTemplate = ({destination}) => (
  `<p class="event__destination-description">${destination.description}</p>`
);

const createDestinationPicturesTemplate = ({src, description}) => (
  `<img
    class="event__photo"
    src="${src}"
    alt="${description}">`
);

const createDestinationTemplate = (events) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${createDestinationDescriptionTemplate(events)}
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${createDestinationPicturesTemplates(createPhotos(events.destination))}
       </div>
     </div>
   </section>`
);

const createTripTypeTransportTemplates = makeTemplateGenerator(createTripTypeTransportTemplate);
const createTripTypePlacesTemplates = makeTemplateGenerator(createTripTypePlacesTemplate);
const createOfferTemplates = makeTemplateGenerator(createOfferTemplate);
const createDestinationPicturesTemplates = makeTemplateGenerator(createDestinationPicturesTemplate);

const createEventEditorTemplate = (events) => (
  `<li class="trip-events__item">
    <form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        ${createTypeTemplate(events)}
        ${createDestinationFieldGroup(events)}
        ${createTimeTemplate(events)}
        ${createPriceTemplate(events)}
        ${createButtonsTemplate(events)}
      </header>
      <section class="event__details">
        ${createOffersTemplate(events)}
        ${createDestinationTemplate(events)}
      </section>
    </form>
  </li>`
);

export {createEventEditorTemplate};
