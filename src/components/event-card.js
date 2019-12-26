import {showTime, showFullDate, showDate, showDateWithYear} from '../utils/date';
import {createEventCardTemplate} from './templates/event-card';
import AbstractComponent from './abstract-component';

const EventsTypeTransport = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
};

const EventsTypePlaces = {
  CHECKIN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};

const getTypeName = (type) => type[0].toUpperCase() + type.slice(1);

const createEventTypesTransport = (checkedType) => Object.values(EventsTypeTransport)
  .map((typeTransport) => ({
    typeTransport,
    nameTransport: getTypeName(typeTransport),
    isChecked: typeTransport === checkedType
  }));

const createEventTypesPlaces = (checkedType) => Object.values(EventsTypePlaces)
  .map((typePlaces) => ({
    typePlaces,
    namePlaces: getTypeName(typePlaces),
    isChecked: typePlaces === checkedType
  }));

const showDateInCard = (card) => {
  const diffTimeUnix = card.dateToUnix - card.dateFromUnix;
  return {
    timeFrom: showTime(card.dateFromUnix),
    timeTo: showTime(card.dateToUnix),
    dateFrom: showDate(card.dateFromUnix),
    dateTo: showDate(card.dateToUnix),
    dateFromWithYear: showDateWithYear(card.dateFromUnix),
    dateToWithYear: showDateWithYear(card.dateToUnix),
    diffTime: showTime(diffTimeUnix),
    fullDateFrom: showFullDate(card.dateFromUnix),
    fullDateTo: showFullDate(card.dateToUnix),
  };
};

const createOffers = (offers) => Object.values(offers)
  .map((offer) => ({
    title: offer.title,
    price: offer.price,
    accepted: offer.accepted,
  }));

const showData = (card) => {
  const {type, destination, basePrice} = card;
  return {
    type: `${type}`,
    destinationName: `${destination.name}`,
    destinationDescription: `${destination.description}`,
    time: showDateInCard(card),
    basePrice: `${basePrice}`,
    offers: createOffers(card.offers),
    typesTransport: createEventTypesTransport(type),
    typesPlaces: createEventTypesPlaces(type),
    // destinationPhoto: createDestinationPhoto(card.destination),
  };
};

class EventCardComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._card = showData(events);
  }

  getTemplate() {
    return createEventCardTemplate(this._card);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

export default EventCardComponent;
export {showData};
