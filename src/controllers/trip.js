import {render} from '../utils/render';

import SiteMenuComponent from '../components/site-menu';
import AddEventButtonComponent from '../components/add-event-button';
import {SortType} from '../components/event-sorter';
import NoEventsComponent from '../components/no-events';
import TripDaysListComponent from '../components/trip-days-list';
import TripDayComponent from '../components/trip-day';

import EventsController from './events';
import SorterController from './sort';
import FilterController from './filter';
import TripInfoController from './trip-info';
import StatsController from './stats';
import {Mode} from '../components/events';
import {isSameDay} from '../utils/common';

const PageMode = {
  TABLE: `table`,
  STATS: `stats`,
};

class TripController {

  constructor(container, eventsModel, destinationsModel, offersModel, api, pageMode) {
    this._pageMode = pageMode;
    this._container = container;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;
    this._details = true;
    this._eventsControllers = [];
    this._sortType = SortType.EVENT;
    this._thipDaysComponent = null;
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._renderWithSortType = this._renderWithSortType.bind(this);
    this._eventsModel.setFilterChangeHandler(this._onSortTypeChange);
    this._eventsModel.setSorterChangeHandler(this._renderWithSortType);
    this._eventsModel.addDataChangeHandler(this._sortEvents);
  }

  render() {
    this._events = this._eventsModel.getEvents();
    this._renderHeaderTemplates();
    this._addEventButtonComponent.setClickHandler(() => this._renderAddEventsButton(this._tripDaysListElement));
    return (this._pageMode === PageMode.TABLE) ? this._renderTablePage() : this._renderStatsPage();
  }

  _renderTablePage() {
    if (this._events.length === 0) {
      render(this._tripEvents, this._noEventComponent.getElement());
    } else {
      this._eventsModel.setSorterChangeHandler(this._onSortTypeChange);
      this._tripDaysListElement = new TripDaysListComponent().getElement();
      this._sorterController = new SorterController(this._tripEvents, this._eventsModel);
      this._sorterController.render();
      this._sorterController.setSorterTypeHandler(this._onSortTypeChange);
      this._renderSortEventsByDefault(this._tripDaysListElement, this._events);
    }
  }

  _renderStatsPage() {
    this._statsController = new StatsController(this._tripEvents);
    this._statsController.render();
  }

  _renderEvents(events, container) {
    return events.map((eventItem) => {
      const eventsController = new EventsController(container, this._onViewChange);
      eventsController.render(eventItem, this._destinationsModel, this._offersModel, Mode.EDIT);
      return eventsController;
    });
  }

  _renderTripDays(container, eventsDates, events) {
    return eventsDates.map((day, i) => {
      const dayEvents = events.filter((event) => isSameDay(event.startDate, day));
      const tripDayComponent = new TripDayComponent(day, dayEvents, i);
      render(container, tripDayComponent.getElement());
      return this._renderEvents(dayEvents, tripDayComponent.getElement().children[1]);
    });
  }

  _renderSortEventsByDefault(component, events) {
    const eventsDates = this._eventsModel.getPointsDates(events);
    render(this._tripEvents, this._tripDaysListElement);
    this._eventsControllers = this._renderTripDays(component, eventsDates, events)
      .reduce((days, day) => days.concat(day), []);
    return this._eventsControllers;
  }

  _renderSortEvents(events) {
    this._eventsControllers = this._renderEvents(events, this._tripDaysListElement)
      .reduce((days, day) => days.concat(day), []);
    return this._eventsControllers;
  }

  _renderWithSortType() {
    const events = this._eventsModel.getEvents();

    if (this._sortType !== SortType.EVENT) {
      this._eventsControllers = this._renderSortEvents(events);
    } else {
      this._renderSortEventsByDefault(this._tripDaysListElement, events);
    }
  }

  _renderHeaderTemplates() {
    const header = this._container.querySelector(`header`);
    const tripMain = header.querySelector(`.trip-main`);
    const tripInfo = tripMain.querySelector(`.trip-info`);
    const tripControls = tripMain.querySelector(`.trip-controls`);
    this._tripEvents = this._container.querySelector(`.trip-events`);
    this._siteMenuComponent = new SiteMenuComponent();
    this._addEventButtonComponent = new AddEventButtonComponent();
    this._noEventComponent = new NoEventsComponent();
    this._tripInfoController = new TripInfoController(tripInfo, this._eventsModel);

    render(tripMain, this._addEventButtonComponent.getElement());
    this._tripInfoController.render();
    render(tripControls, this._siteMenuComponent.getElement());
    if (this._pageMode !== PageMode.STATS) {
      this._filterController = new FilterController(tripControls, this._eventsModel);
      this._filterController.render();
    }
  }

  _renderAddEventsButton(container) {
    this._newEventId = this._eventsModel.getEvents().length;
    this._addEventFormController = new EventsController(container, this._onViewChange);
    this._addEventFormController.render({}, this._destinationsModel, this._offersModel, Mode.ADD);
  }

  _onSortTypeChange(sortType) {
    this._sortType = sortType;
    this._eventsModel.setSorter(sortType);
    this._renderWithSortType();
  }

  _onViewChange() {
    this._eventsControllers.forEach((it) => it.setDefaultView());
  }
}

export default TripController;
