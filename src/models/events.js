import {FilterType} from '../components/event-filter';
import {SortType} from '../components/event-sorter';
import {formatDuration} from '../components/templates/date';
import moment from 'moment';

const isSameDay = (firstDate, secondDate) => {
  return moment(firstDate).isSame(secondDate, `day`) && moment(firstDate).isSame(secondDate, `month`) && moment(firstDate).isSame(secondDate, `year`);
};

const getUniqueDays = (days) => {
  let uniqueDays = [];
  days.forEach((day, i) => {
    if (i === 0 || uniqueDays.every((it) => isSameDay(it, day) === false)) {
      uniqueDays.push(day);
    }
  });
  return uniqueDays;
};

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
    this._pointsDates = [];
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

  getPointsDates(points) {
    const pointsDates = this._getPointsDates(points);
    return pointsDates;
  }

  setEvents(events) {
    if (events.length === 0) {
      this._events = [];
      this._eventDates = [];
      return;
    }
    this._events = events
      .map((event) => Object.assign({}, event, {startDate: event.dateFrom}, {endDate: event.dateFrom}))
      .sort((a, b) => formatDuration(a.dateFrom, b.dateFrom) > 0);

    this._eventsDates = this._getPointsDates(this._events);
  }

  _sumOffers(offerList) {
    return offerList.reduce((total, current) => total + current.price, 0);
  }

  calcTotalAmount() {
    return this._events.reduce((total, current) => total + current.basePrice + this._sumOffers(current.offers), 0);
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
    if (Object.values(SortType).some((it) => it === sortType)) {
      this._activeSortType = sortType;
    }
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

  _getPointsDates(points) {
    const startDates = points.map((point) => point.dateFrom).sort((a, b) => formatDuration(a, b));
    return getUniqueDays(startDates);
  }
}
