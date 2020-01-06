import {createEventCardTemplate} from '../templates/event-card';
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

const createEventTypesTransport = (checkedTypes) => Object.values(EventTypeTransport)
  .map((typeTransport) => ({
    typeTransport,
    nameTransport: getTypeName(typeTransport),
    isChecked: typeTransport === checkedTypes,
  }));

const createEventTypesPlace = (checkedTypes) => Object.values(EventTypePlace)
  .map((typePlaces) => ({
    typePlaces,
    namePlaces: getTypeName(typePlaces),
    isChecked: typePlaces === checkedTypes,
  }));

const createPhotos = (destination) => Object.values(destination.pictures);

class EventCardComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createEventCardTemplate(this._events);
  }

  setRollUpButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

export default EventCardComponent;
export {createEventTypesTransport, createEventTypesPlace, createPhotos, getCorrectPreposition};
