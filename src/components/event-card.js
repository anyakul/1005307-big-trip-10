import AbstractComponent from './abstract-component';
import {createEventCardTemplate} from './templates/event-card';
import {formatDate} from './templates/date';

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
  TRANSPORT: `to`,
  PLACE: `in`,
};

const getCorrectPreposition = (type) => {
  return ((type === EventTypePlace.CHECKIN || type === EventTypePlace.SIGHTSEEING || type === EventTypePlace.RESTAURANT) ?
    Preposition.PLACE : Preposition.TRANSPORT);
};

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

  getEventCardDate(eventItem) {
    return formatDate(eventItem.dateFrom);
  }
}

export default EventCardComponent;
export {EventTypeTransport,
  EventTypePlace,
  createPhotos,
  getCorrectPreposition,
};
