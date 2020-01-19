import {render} from '../utils/render';
import moment from 'moment';
import SiteMenuComponent from '../components/site-menu';
import AddEventButtonComponent from '../components/add-event-button';
import {SortType} from '../components/event-sorter';

import SortBoardComponent from '../components/sort-board';
import NoEventsComponent from '../components/no-events';
import TripDaysListComponent from '../components/trip-days-list';
import TripDayComponent from '../components/trip-day';

import EventsController from './events';
import SorterController from './sort';
import FilterController from './filter';
import TripInfoController from './trip-info';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

const isSameDay = (firstDate, secondDate) => {
  return moment(firstDate).isSame(secondDate, `day`) && moment(firstDate).isSame(secondDate, `month`) && moment(firstDate).isSame(secondDate, `year`);
};
class TripController {

  constructor(container, eventsModel, destinationsModel, offersModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;
    this._eventsControllers = [];
    this._sortType = SortType.EVENT;
    this._thipDaysComponent = null;
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._eventsModel.setFilterChangeHandler(this._renderWithSortType);
    this._eventsModel.setSorterChangeHandler(this._onSortTypeChange);
    this._eventsModel.addDataChangeHandler(this._sortEvents);
  }

  _renderEvents(events, container) {
    return events.map((eventItem) => {
      const eventsController = new EventsController(container, this._onViewChange);
      eventsController.render(eventItem.id, eventItem, this._destinationsModel, this._offersModel, Mode.DEFAULT);
      return eventsController;
    });
  }

  _renderTripDays(container, eventsDates, events) {
    return eventsDates.map((day, i) => {
      const dayEvents = events.filter((event) => isSameDay(event.dateFrom, day));
      const tripDayComponent = new TripDayComponent(day, dayEvents, i);
      render(container, tripDayComponent.getElement());
      return this._renderEvents(dayEvents, tripDayComponent.getElement().children[1]);
    });
  }

  render() {
    this._events = this._eventsModel.getEvents();
    this._renderTemplates(this._events);

    if (this._events.length === 0) {
      render(this._tripEvents, this._noEventComponent.getElement());
    } else {
      this._eventsModel.setSorterChangeHandler(this._onSortTypeChange);
      this._tripDaysListElement = new TripDaysListComponent().getElement();
      this._sorterController = new SorterController(this._tripEvents, this._eventsModel);
      this._sorterController.render();
      this._renderSortEvents();
    }
  }

  _renderSortEvents() {
    const eventsDates = this._eventsModel.getPointsDates(this._events);
    render(this._tripEvents, this._tripDaysListElement);
    this._eventsControllers = this._renderTripDays(this._tripDaysListElement, eventsDates, this._events)
      .reduce((days, day) => days.concat(day), []);
  }

  _renderTemplates() {
    const header = this._container.querySelector(`header`);
    const tripMain = header.querySelector(`.trip-main`);
    const tripInfo = tripMain.querySelector(`.trip-info`);
    const tripControls = tripMain.querySelector(`.trip-controls`);
    this._tripEvents = this._container.querySelector(`.trip-events`);
    this._siteMenuComponent = new SiteMenuComponent();
    this._addEventButtonComponent = new AddEventButtonComponent();
    this._noEventComponent = new NoEventsComponent();
    this._sortBoardContainer = new SortBoardComponent();
    this._tripInfoController = new TripInfoController(tripInfo, this._eventsModel);
    this._tripInfoController.render();
    this._filterController = new FilterController(tripControls, this._eventsModel);
    render(tripMain, this._addEventButtonComponent.getElement());
    render(tripControls, this._siteMenuComponent.getElement());
    this._filterController.render();
  }

  _renderWithSortType() {
    const events = this._eventsModel.getEvents();

    if (this._sortType !== SortType.EVENT) {
      this._eventsControllers = this._renderEvents(events, this._tripDaysListElement.getElement().children[1], this._onViewChange)
        .reduce((days, day) => days.concat(day), []);
    } else {
      this._sorterController.get();
      this._renderSortEvents();
    }
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
