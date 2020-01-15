import {FilterType} from '../components/event-filter-component';
import {SortType} from '../components/event-sorter-component';
import {formatDuration, formatDate} from '../components/templates/date';

const getSortedPoints = (points, sortType) => {
  switch (sortType) {
    case SortType.EVENT:
      points.slice();
      break;
    case SortType.TIME:
      points.slice().sort((a, b) => formatDuration(b.dateTo, b.dateFrom) - formatDuration(a.dateTo, a.dateFrom));
      break;
    case SortType.PRICE:
      points.slice().sort((a, b) => b.basePrice - a.basePrice);
      break;
  }
  return points;
};

export default class Events {
  constructor() {
    this._events = [];
    this._filterChangeHandlers = [];
    this._sorterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._activeFilterType = FilterType.EVERYTHING;
    this._activeSortType = SortType.EVENT;
  }

  getEventsByFilter(filterType) {
    switch (filterType) {
      case FilterType.EVERYTHING:
        return this._events;
      case FilterType.FUTURE:
        return this._events.filter((point) => formatDuration(point.dateFrom, Date.now()) > 0);
      case FilterType.PAST:
        return this._events.filter((point) => formatDuration(point.dateFrom, Date.now()) < 0);
    }
    return this._events;
  }

  getEvents() {
    return getSortedPoints(this.getEventsByFilter(this._activeFilterType), this._activeSortType);
  }

  generateTripDays() {
    this._tripDays = [];
    this._currentCards = [];

    this._events.forEach((eventItem, i) => {
      let prevCard = i > 0 ? this._events[i - 1] : null;

      if (prevCard && formatDate(eventItem.dateFrom) !== formatDate(prevCard.dateFrom)) {
        this._tripDays.push(this._currentCards);
        this._currentCards = [];
      }
      this._currentCards.push(eventItem);
      if (i === this._events.length - 1) {
        this._tripDays.push(this._currentCards);
      }
    });

    return this._tripDays;
  }

  setEvents(events) {
    this._events = Array.from(events);
  }

  addEvent(point) {
    this._events = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }

  removeEvent(id) {
    const index = this._getEventById(id);
    if (index === -1) {
      throw Error(`no point with id ${id} in points array`);
    }

    this._events = [].concat(this._events.slice(0, index), this._events.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  setSorter(sortType) {
    this._activeSortType = sortType;
    this._sorterChangeHandlers.forEach((handler) => handler());
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  updateEvent(id, eventItem) {
    const index = this._events.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._events = [].concat(this._events.slice(0, index), eventItem, this._events.slice(index + 1));

    return true;
  }

  _getEventById(id) {
    return this._events.findIndex((eventItem) => eventItem.id === id);
  }

  addDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setSorterChangeHandler(handler) {
    this._sorterChangeHandlers.push(handler);
  }
}
