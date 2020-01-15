import {RenderPosition, render, remove} from '../utils/render';

import TripInfoComponent from '../components/trip-info-component';
import SiteMenuComponent from '../components/site-menu-component';
import TripCostComponent from '../components/trip-cost-component';
import AddEventButtonComponent from '../components/add-event-button-component';
import {SortType} from '../components/event-sorter-component';
import DayBoardComponent from '../components/day-board-component';
import SortBoardComponent from '../components/sort-board-component';
import NoEventsComponent from '../components/no-events-component';

import EventsController from './events-controller';
import SorterController from './sort-controller';
import FilterController from './filter-controller';

class TripController {

  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._eventsControllers = [];
    this._sortType = SortType.EVENT;
    this._siteMenuComponent = new SiteMenuComponent();
    this._addEventButtonComponent = new AddEventButtonComponent();
    this._noEventComponent = new NoEventsComponent();
    this._sortBoardContainer = new SortBoardComponent();
    this._onViewChange = this._onViewChange.bind(this);

    this._tripDays = this._eventsModel.generateTripDays();

    this._tripEvents = this._container.querySelector(`.trip-events`);
    this._dayBoardComponent = new DayBoardComponent(this._tripDays);

    this._eventsModel.addDataChangeHandler(this._sortEvents);
    this._sorterController = new SorterController(this._tripEvents, this._eventsModel);
  }

  render() {
    this._events = this._eventsModel.getEvents();
    const header = this._container.querySelector(`header`);
    const tripMain = header.querySelector(`.trip-main`);
    const tripInfo = tripMain.querySelector(`.trip-info`);
    const tripControls = tripMain.querySelector(`.trip-controls`);
    this._tripCostComponent = new TripCostComponent(this._events);
    this._tripInfoComponent = new TripInfoComponent(this._events);
    this._filterController = new FilterController(tripControls, this._eventsModel);
    this._sorterController.render();

    render(tripMain, this._addEventButtonComponent, RenderPosition.BEFOREEND);
    render(tripInfo, this._tripCostComponent, RenderPosition.AFTERBEGIN);
    render(tripInfo, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    render(tripControls, this._siteMenuComponent, RenderPosition.BEFOREEND);

    this._filterController.render();
    if (!this._events.length) {
      render(this._tripEvents, this._noEventComponent, RenderPosition.BEFOREEND);
    } else {
      this._sortEvents();
    }
    this._eventsModel.setFilterChangeHandler(this._sortEvents);
    this._eventsModel.setSorterChangeHandler(this._sortEvents);
  }

  _sortEvents() {
    if (this._sortBoardContainer) {
      remove(this._sortBoardContainer);
    }
    this._events.forEach((card) => {
      this._eventsController = new EventsController(card, this._onViewChange);
      if (this._sortType === SortType.EVENT) {
        render(this._tripEvents, this._dayBoardComponent, RenderPosition.BEFOREEND);
        const tripEventsList = this._tripEvents.querySelectorAll(`.trip-events__list`);
        tripEventsList.innerHTML = ``;
        this._eventsController.setEventToDay(card, tripEventsList);
      } else {
        if (this._dayBoardComponent) {
          remove(this._dayBoardComponent);
        }
        render(this._tripEvents, this._sortBoardContainer, RenderPosition.BEFOREEND);
        const tripEventsList = this._tripEvents.querySelector(`.trip-events__list`);
        this._eventsController.setEvent(tripEventsList);
      }
      this._eventsControllers.push(this._eventsController);
    });
    return this._eventsControllers.concat();
  }

  _onViewChange() {
    this._eventsControllers.forEach((it) => it.setDefaultView());
  }
}

export default TripController;
