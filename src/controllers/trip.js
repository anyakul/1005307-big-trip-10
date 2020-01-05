import {RenderPosition, render, remove} from '../utils/render';
import {showDate} from '../utils/date';

import TripInfoComponent from '../components/trip-info';
import SiteMenuComponent from '../components/site-menu';
import EventFilterComponent from '../components/event-filter';
import TripCostComponent from '../components/trip-cost';
import AddEventButtonComponent from '../components/add-event-button';
import EventSorterComponent, {SortType} from '../components/event-sorter';
import DayBoardComponent, {generateTripDays} from '../components/day-board';
import SortBoardComponent from '../components/sort-board';

import PointController from './point';

class TripController {

  constructor(container) {
    this._container = container;
    this._events = [];
    this._siteMenuComponent = new SiteMenuComponent();
    this._eventFilterComponent = new EventFilterComponent();
    this._addEventButtonComponent = new AddEventButtonComponent();
    this._eventSorterComponent = new EventSorterComponent();
    this._sortBoardContainer = new SortBoardComponent();

    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._tripEvents = this._container.querySelector(`.trip-events`);
    this._eventSorterComponent.setSortChangeHandler(this._onSortTypeChange);

    this._pointControllers = [];
  }

  render(events) {
    const header = this._container.querySelector(`header`);
    const tripMain = header.querySelector(`.trip-main`);
    const tripInfo = tripMain.querySelector(`.trip-info`);
    const tripControls = tripMain.querySelector(`.trip-controls`);

    this._events = events;
    this._tripDays = generateTripDays(this._events);

    this._tripCostComponent = new TripCostComponent(this._events);
    this._dayBoardComponent = new DayBoardComponent(this._tripDays);

    render(tripMain, this._addEventButtonComponent, RenderPosition.BEFOREEND);
    render(tripInfo, this._tripCostComponent, RenderPosition.AFTERBEGIN);
    render(tripInfo, new TripInfoComponent(events[0]), RenderPosition.AFTERBEGIN);
    render(tripControls, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(tripControls, this._eventFilterComponent, RenderPosition.BEFOREEND);
    render(this._tripEvents, this._eventSorterComponent, RenderPosition.AFTERBEGIN);
    render(this._tripEvents, this._dayBoardComponent, RenderPosition.BEFOREEND);

    this._newEvents = this._sortEventsDefault();
    this._pointControllers = this._pointControllers.concat(this._newEvents);
  }

  _sortEventsDefault() {
    const pointControllers = [];
    this._events.forEach((card) => {
      const tripEventsList = this._tripEvents.querySelectorAll(`.trip-events__list`);
      tripEventsList.innerHTML = ``;
      const {dateFromUnix} = card;

      tripEventsList.forEach((tripEventItem) => {
        if (showDate(tripEventItem.dataset.date) === `${showDate(dateFromUnix)}`) {
          const pointController = new PointController(tripEventItem, this._onViewChange);
          pointController.render(card);
          pointControllers.push(pointController);
        }
      });
    });
    return pointControllers;
  }

  _sortEvents(sortedEvents) {
    const pointControllers = [];
    sortedEvents.forEach((card) => {
      const tripEventsList = this._tripEvents.querySelector(`.trip-events__list`);
      const pointController = new PointController(tripEventsList, this._onViewChange);
      pointController.render(card);
      pointControllers.push(pointController);
    });
    return pointControllers;
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedEvents = [];

    switch (sortType) {
      case SortType.EVENT:
        render(this._tripEvents, this._dayBoardComponent, RenderPosition.BEFOREEND);
        this._newEvents = this._sortEventsDefault();
        this._pointControllers = this._pointControllers.concat(this._newEvents);
        break;

      case SortType.PRICE:
        sortedEvents = this._events.slice().sort((a, b) => b.basePrice - a.basePrice);
        break;

      case SortType.TIME:
        sortedEvents = this._events.slice().sort((a, b) => {
          const durationFirst = a.dateToUnix - a.dateFromUnix;
          const durationSecond = b.dateToUnix - b.dateFromUnix;
          return durationSecond - durationFirst;
        });
        break;
    }

    if (sortType === SortType.EVENT) {
      if (this._sortBoardContainer) {
        remove(this._sortBoardContainer);
      }
    } else {
      if (this._sortBoardContainer) {
        remove(this._sortBoardContainer);
      }

      if (this._dayBoardComponent) {
        remove(this._dayBoardComponent);
      }
      render(this._tripEvents, this._sortBoardContainer, RenderPosition.BEFOREEND);
      this._newEvents = this._sortEvents(sortedEvents);
      this._pointControllers = this._pointControllers.concat(this._newEvents);
    }
  }
}

export default TripController;
