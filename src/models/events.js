import {FilterType} from '../components/event-filter';
import {SortType} from '../components/event-sorter';
import {formatDuration, isSameDay} from '../components/templates/date';
import {getEventsByFilter} from '../utils/filter';

const getUniqueDays = (days) => {
  const uniqueDays = [];
  days.forEach((day, i) => {
    if (i === 0 || uniqueDays.every((it) => !isSameDay(it, day))) {
      uniqueDays.push(day);
    }
  });
  return uniqueDays;
};

export default class EventsModel {
  constructor() {
    this._events = [];
    this._filterChangeHandlers = [];
    this._sorterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._activeSortType = SortType.EVENT;
  }

  getEventsByFilter(filterType) {
    const now = Date.now();

    switch (filterType) {
      case FilterType.FUTURE:
        return this._events.filter(({startDate}) => Date.parse(startDate) > now);
      case FilterType.PAST:
        return this._events.filter(({startDate}) => Date.parse(startDate) < now);
    }

    return this._events;
  }

  getEvents() {                                         //    console.log('getEventsByFilter=',getEventsByFilter(this._events, this._activeFilterType));
    return getEventsByFilter(this._events, this._activeFilterType);
  }

  getEventsAll() {
    return this._events;
  }

  getPointsDates(points) {
    return this._getPointsDates(points);
  }

  setEvents(events) {
    if (events.length === 0) {
      this._events = [];
      this._eventDates = [];
      return;
    }

    this._events = events;
  }

  calcTotalPrice() {
    let sum = 0;
    for (const eventItem of this._events) {
      sum += eventItem.price;
      sum += eventItem.offers.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    }
    return sum;
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

  setSorter(sortType) {
    if (Object.values(SortType).some((it) => it === sortType)) {
      this._activeSortType = sortType;
    }
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
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

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  _getEventById(id) {
    return this._events.findIndex((eventItem) => eventItem.id === id);
  }

  addOnDataChange(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setOnFilterChange(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setOnSorterChange(handler) {
    this._sorterChangeHandlers.push(handler);
  }

  _getPointsDates(points) {
    const startDates = points.map((point) => point.startDate).sort((a, b) => formatDuration(a, b));
    return getUniqueDays(startDates);
  }
}
