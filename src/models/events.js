import {FilterType} from '../components/event-filter';
import {getEventsByFilter} from '../utils/filter';

class EventsModel {
  constructor() {
    this._events = [];

    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];

    this._activeFilterType = FilterType.EVERYTHING;
  }

  isEmpty() {
    return this._events.length === 0;
  }

  getEvents() {
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getEventsAll() {
    return this._events;
  }

  setEvents(events) {
    if (events.length === 0) {
      this._events = [];
      this._eventDates = [];
      return;
    }

    this._events = events;
  }

  addEvent(eventItem) {
    this._events = [...this._events, eventItem];
    this._callHandlers(this._dataChangeHandlers);
  }

  removeEvent(id) {
    const index = this._getEventById(id);
    if (index === -1) {
      throw Error(`no events with id ${id} in events array`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1),
    ];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updateEvent(id, eventItem) {
    const index = this._getEventById(id);
    if (index === -1) {
      return false;
    }

    this._events = [
      ...this._events.slice(0, index),
      eventItem,
      ...this._events.slice(index + 1),
    ];

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  addOnDataChange(handler) {
    this._dataChangeHandlers.push(handler);
  }

  addOnFilterChange(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _getEventById(id) {
    return this._events.findIndex((eventItem) => eventItem.id === id);
  }
}

export default EventsModel;
