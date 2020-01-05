import {showTime, showFullDate, showDate, showDateWithYear} from '../utils/date';
import {createEventCardTemplate} from './templates/event-card';
import AbstractComponent from './abstract-component';

const EventTypeTransport = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
};

const EventTypePlace = {
  CHECKIN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};

const Preposition = {
  PREPOSITION_FOR_TRANSPORT: `to`,
  PREPOSITION_FOR_PLACE: `in`,
};

const getCorrectPreposition = (type) => {
  return ((type === EventTypePlace.CHECKIN || type === EventTypePlace.SIGHTSEEING || type === EventTypePlace.RESTAURANT) ?
    Preposition.PREPOSITION_FOR_PLACE : Preposition.PREPOSITION_FOR_TRANSPORT);
};

const getTypeName = (type) => type[0].toUpperCase() + type.slice(1);

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

const createEventTypesTransport = (checkedType) => Object.values(EventTypeTransport)
  .map((typeTransport) => ({
    typeTransport,
    nameTransport: getTypeName(typeTransport),
    isChecked: typeTransport === checkedType,
  }));

const createEventTypesPlace = (checkedType) => Object.values(EventTypePlace)
  .map((typePlaces) => ({
    typePlaces,
    namePlaces: getTypeName(typePlaces),
    isChecked: typePlaces === checkedType,
  }));

const createOffers = (offers) => Object.values(offers);
const createPhotos = (destination) => Object.values(destination.pictures);

const showData = (card) => {
  const {type, destination, basePrice} = card;
  return {
    type: `${type}`,
    destinationName: `${destination.name}`,
    destinationDescription: `${destination.description}`,
    destinationPictures: createPhotos(card.destination),
    time: showDateInCard(card),
    basePrice: `${basePrice}`,
    offers: createOffers(card.offers),
    typesTransport: createEventTypesTransport(type),
    typesPlaces: createEventTypesPlace(type),
    preposition: getCorrectPreposition(type),
    isFavorite: card.isFavorite,
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

  setRollUpButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

export default EventCardComponent;
export {showData};
