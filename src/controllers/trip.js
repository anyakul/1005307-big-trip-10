import {RenderPosition, render, remove} from '../utils/render';

import TripInfoComponent from '../components/trip-info';
import SiteMenuComponent from '../components/site-menu';
import EventFilterComponent from '../components/event-filter';
import TripCostComponent from '../components/trip-cost';
import AddEventButtonComponent from '../components/add-event-button';
import EventSorterComponent, {SortType} from '../components/event-sorter';
import DayBoardComponent from '../components/day-board';
import SortBoardComponent from '../components/sort-board';

import PointController from './point';

class TripController {

  constructor(container) {
    this._container = container;
    this._events = [];
    this._sortedEvents = [];
    this._pointControllers = [];
    this._siteMenuComponent = new SiteMenuComponent();
    this._eventFilterComponent = new EventFilterComponent();
    this._addEventButtonComponent = new AddEventButtonComponent();
    this._eventSorterComponent = new EventSorterComponent();
    this._sortBoardContainer = new SortBoardComponent();
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._tripEvents = this._container.querySelector(`.trip-events`);
    this._eventSorterComponent.setSortChangeHandler(this._onSortTypeChange);
  }

  render(events) {
    const header = this._container.querySelector(`header`);
    const tripMain = header.querySelector(`.trip-main`);
    const tripInfo = tripMain.querySelector(`.trip-info`);
    const tripControls = tripMain.querySelector(`.trip-controls`);

    this._events = events;

    this._tripCostComponent = new TripCostComponent(this._events);
    this._dayBoardComponent = new DayBoardComponent(this._events);
    this._tripInfoComponent = new TripInfoComponent(this._events);

    render(tripMain, this._addEventButtonComponent, RenderPosition.BEFOREEND);
    render(tripInfo, this._tripCostComponent, RenderPosition.AFTERBEGIN);
    render(tripInfo, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripControls, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(tripControls, this._eventFilterComponent, RenderPosition.BEFOREEND);
    render(this._tripEvents, this._eventSorterComponent, RenderPosition.AFTERBEGIN);

    this._showSortEvents(this._sortEvents(SortType.EVENT));
  }

  _sortEvents(sortType) {
    if (this._sortBoardContainer) {
      remove(this._sortBoardContainer);
    }

    this._events.forEach((card) => {
      this._pointController = new PointController(card, this._onViewChange);
      if (sortType === SortType.EVENT) {
        render(this._tripEvents, this._dayBoardComponent, RenderPosition.BEFOREEND);
        const tripEventsList = this._tripEvents.querySelectorAll(`.trip-events__list`);
        tripEventsList.innerHTML = ``;
        this._pointController.setEventToDay(card, tripEventsList);
      } else {
        if (this._dayBoardComponent) {
          remove(this._dayBoardComponent);
        }
        render(this._tripEvents, this._sortBoardContainer, RenderPosition.BEFOREEND);
        const tripEventsList = this._tripEvents.querySelector(`.trip-events__list`);
        this._pointController.setEvent(tripEventsList);
      }
      this._pointControllers.push(this._pointController);
    });
    return this._pointControllers;
  }

  _showSortEvents(method) {
    this._pointControllers = this._pointControllers.concat(method);
  }

  _onSortTypeChange(sortType) {

    switch (sortType) {
      case SortType.EVENT:
        this._showSortEvents(this._sortEvents());
        break;

      case SortType.PRICE:
        this._events = this._events.slice().sort((a, b) => b.basePrice - a.basePrice);
        this._showSortEvents(this._sortEvents());
        break;

      case SortType.TIME:
        this._events = this._events.slice().sort((a, b) => {
          const durationFirst = a.dateTo - a.dateFrom;
          const durationSecond = b.dateTo - b.dateFrom;
          return durationSecond - durationFirst;
        });
        this._showSortEvents(this._sortEvents());
        break;
    }
  }

  _onViewChange() {
    this._pointControllers.forEach((it) => it.setDefaultView());
  }
}

export default TripController;
