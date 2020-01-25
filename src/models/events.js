import {FilterType} from '../components/event-filter';
import {SortType} from '../components/event-sorter';
import {formatDuration} from '../components/templates/date';
import {isSameDay} from '../utils/common';
import moment, {duration} from 'moment';
const calcDuration = (start, end) => moment(end).diff(start);
const getUniqueDays = (days) => {
  let uniqueDays = [];
  days.forEach((day, i) => {
    if (i === 0 || uniqueDays.every((it) => !isSameDay(it, day))) {
      uniqueDays.push(day);
    }
  });
  return uniqueDays;
};

const getSortedPoints = (points, sortType) => {
  switch (sortType) {
    case SortType.TIME:
      points.slice().sort((a, b) => formatDuration(b.dateTo, b.dateFrom) - formatDuration(a.dateTo, a.dateFrom));
      break;
    case SortType.PRICE:
      points.slice().sort((a, b) => b.basePrice - a.basePrice);
      break;
  }
  return points;
};

const createFormatDuration = (point) => {  
   return calcDuration(point.startDate, Date.now());  
};

export default class EventsModel {
  constructor() {
    this._events = [];
    this._pointsDates = [];
    this._filterChangeHandlers = [];
    this._sorterChangeHandlers = [];
    this._dataChangeHandlers = [];
    this._activeFilterType = FilterType.PAST;
    this._activeSortType = SortType.EVENT;
  }

  getEventsByFilter(filterType) {   //console.log('events', this._events);
                                                       
    switch (filterType) {
      case FilterType.FUTURE: // console.log(this._events.filter((point) => createFormatDuration(point) > 0));  
        return this._events.filter((point) => createFormatDuration(point) < 0);
      case FilterType.PAST:   //  console.log(this._events.filter((point) => createFormatDuration(point) < 0)); 
        return this._events.filter((point) => createFormatDuration(point) > 0);
    }
    return this._events;
  }

  getEvents() { // console.log('ura',this.getEventsByFilter(this._activeFilterType/*, this._activeSortType*/));                                                                                    //    console.log(this._activeFilterType);
    return /*getSortedPoints(*/this.getEventsByFilter(this._activeFilterType/*, this._activeSortType*/);
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
    this._events = events
      .map((event) => Object.assign({}, event, {startDate: event.startDate}, {endDate: event.endDate}))
      .sort((a, b) => formatDuration(a.startDate, b.startDate) > 0);

    this._eventsDates = this._getPointsDates(this._events);
  }

  calcTotalAmount() {
    let sum = 0;
    for (const eventItem of this._events) {
      sum += eventItem.price;
      sum += eventItem.offers.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    }
    return sum;
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
    const startDates = points.map((point) => point.startDate).sort((a, b) => formatDuration(a, b));
    return getUniqueDays(startDates);
  }
}
