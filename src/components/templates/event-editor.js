import {TRANSFER_EVENTS,
  ACTIVITY_EVENTS,
  Mode
}
  from '../events';
import {formatFullDate} from './date';

const hasSameTitle = (array, it) => array.some((arrayIt) => array.length ? arrayIt.title === it.title : false);

const capitalizeFirstLetter = (str) => {
  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
};

const getEventType = (event) => ACTIVITY_EVENTS.findIndex((it) => it.toLowerCase() === event) !== -1 ? `activity` : `transfer`;

const Preposition = {
  activity: `at`,
  transfer: `to`
};

const createTripTypeImageTemplate = (type) => (
  `<img
    class="event__type-icon"
    width="17"
    height="17"
    src="img/icons/${type}.png"
    alt="Event type icon"
  >`
);

const createEventTypeItem = (eventType, isChecked, id) => {
  const isCheckedValue = isChecked ? `checked` : ``;

  return (
    `<div class="event__type-item">
      <input
        id="event-type-${eventType}-${id}"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${eventType}"
        ${isCheckedValue}
      >
      <label
        class="event__type-label event__type-label--${eventType}"
        for="event-type-${eventType}-${id}">
        ${capitalizeFirstLetter(eventType)}
      </label>
    </div>`
  );
};

const createEventTypeListSection = (eventItem) => {
  const {id} = eventItem;
  const activityEventItems = ACTIVITY_EVENTS.map(
      (activityEvent) => createEventTypeItem(activityEvent, activityEvent === eventItem.type, id)
  ).join(`\n`);

  const transferEventItems = TRANSFER_EVENTS.map(
      (transferEvent) => createEventTypeItem(transferEvent, transferEvent === eventItem.type, id)
  ).join(`\n`);

  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Transfer</legend>
        ${transferEventItems}
      </fieldset>
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Activity</legend>
        ${activityEventItems}
      </fieldset>
    </div>`
  );
};

const createDestinationListSection = (id, destinations) => {
  const optionsTemplate = destinations.map((it) => `<option value="${it.name}">${it.name}</option>`).join(`\n`);

  return (
    `<datalist id="destination-list-${id}">
      ${optionsTemplate}
    </datalist>`
  );
};

const createFavoriteButtonTemplate = (id, isFavorite) => {
  const isChecked = isFavorite ? `checked` : ``;
  return (
    `<input
      id="event-favorite-${id}"
      class="event__favorite-checkbox  visually-hidden"
      type="checkbox"
      name="event-favorite"
      ${isChecked}
      >
    <label class="event__favorite-btn" for="event-favorite-${id}">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>`
  );
};

const createOfferSelector = (id, type, offer, isChecked) => {
  const {title, price} = offer;
  return (
    `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${type}-${id}"
        type="checkbox"
        name="event-offer-${type}"
        ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${type}-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
};

const getShowedOffers = (offers, availableOffers) => {
  return availableOffers.map((availableOffer) => {

    return hasSameTitle(offers, availableOffer) ? offers.find((it) => it.title === availableOffer.title) : availableOffer;
  });
};

const createOffersSection = (id, type, offers, availableOffers) => {
  const offersToShow = getShowedOffers(offers, availableOffers);
  const offersTemplate = offersToShow.map((offer, i) => createOfferSelector(`${id}-${i}`, type, offer, hasSameTitle(offers, offer))).join(`\n`);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>`
  );
};

const createPhotoTemplate = (picture) => {
  const {src, description} = picture;
  return (`<img class="event__photo" src="${src}" alt="${description}" />`);
};

const createDestinationSection = (destination) => {
  const {name, description, pictures} = destination;
  const photosTemplate = pictures.map((it) => createPhotoTemplate(it)).join(`\n`);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">${name}</h3>
      <p class="event__destination-description">${description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photosTemplate}
        </div>
      </div>
    </section>`
  );
};

const createFormHeaderTemplate = (event, destinations, mode) => {
  const {id, type, startDate, endDate, destination, price, isFavorite} = event;

  const eventName = capitalizeFirstLetter(type);
  const preposition = Preposition[getEventType(type)];
  const eventIcon = createTripTypeImageTemplate(type);
  const eventDestination = destination.name;

  const eventStartDate = formatFullDate(startDate);
  const eventsEndDate = formatFullDate(endDate);

  const eventTypeListSection = createEventTypeListSection(event);
  const destinationListSection = createDestinationListSection(id, destinations.getAll());

  const resetButtonName = mode === Mode.ADD ? `Cancel` : `Delete`;
  const isFavoriteButton = mode === Mode.ADD ? `` : createFavoriteButtonTemplate(id, isFavorite);

  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
        <span class="visually-hidden">Choose event type</span>
        ${eventIcon}
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
      ${eventTypeListSection}
    </div>
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
        ${eventName} ${preposition}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${eventDestination}" list="destination-list-${id}" required>
      ${destinationListSection}
    </div>
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${eventStartDate}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${eventsEndDate}" required>
    </div>
    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-${id}">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-${id}"
        type="number" name="event-price"
        value="${price}"
        required
        min="0">
    </div>
    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${resetButtonName}</button>
    ${isFavoriteButton}`
  );
};

const createDetailsTemplate = (event, destinations, availableOffers) => {
  const {id, type, destination, offers} = event;
  const eventDestination = destinations.getDestinationByName(destination.name);
  const offersTemplate = availableOffers.length ? createOffersSection(id, type, offers, availableOffers) : ``;
  const destinationTemplate = createDestinationSection(eventDestination);

  return (
    `<section class="event__details">
      ${offersTemplate}
      ${destinationTemplate}
    </section>`
  );
};

const createEventEditorTemplate = (event, destinations, availableOffers, mode) => {
  const headerInner = createFormHeaderTemplate(event, destinations, mode);
  const detailsSection = createDetailsTemplate(event, destinations, availableOffers);

  return mode === Mode.ADD ?
    (`<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        ${headerInner}
      </header>
      ${detailsSection}
    </form>`)
    :
    (`<li class="trip-events__item">
      <form class="event  event--edit" action="#" method="post">
        <header class="event__header">
          ${headerInner}
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        ${detailsSection}
      </form>
    </li>`);
};

export {createEventEditorTemplate};

