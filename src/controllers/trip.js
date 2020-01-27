import {render} from '../utils/render';

import {SortType} from '../components/event-sorter';
import NoEventsComponent from '../components/no-events';
import TripDaysListComponent from '../components/trip-days-list';
import TripDayComponent from '../components/trip-day';

import EventsController from './events';
import SorterController from './sort';
import StatsController from './stats';
import {Mode} from '../components/events';
import {isSameDay} from '../utils/common';
const HIDE_CLASS = `trip-events--hidden`;

class TripController {

  constructor(container, eventsModel, destinationsModel, offersModel, api) {
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
    this._onDataChange = this._onDataChange.bind(this);
    eventsModel.setFilterChangeHandler(this._onSortTypeChange);
    eventsModel.setSorterChangeHandler(this._renderWithSortType);
    eventsModel.addDataChangeHandler(this._onDataChange);
  }

  render() {
    this._noEventComponent = new NoEventsComponent();
    this._events = this._eventsModel.getEvents();                  //console.log('trip',this._events);
   // this._addEventButtonComponent.setClickHandler(() => this._renderAddEventsButton(this._tripDaysListElement));
   // this._renderStatsPage();
    this._renderTablePage();      //console.log('trip',this._events);
  }

  _renderTablePage() {                                            console.log('renderTablepage', this._events);
    if (this._events.length === 0) {
      render(this._tripEvents, this._noEventComponent.getElement());
    } else {
   /* //   this._eventsModel.setSorterChangeHandler(this._onSortTypeChange); */
      this._tripDaysListElement = new TripDaysListComponent().getElement();
      this._sorterController = new SorterController(this._container, this._eventsModel);
      this._sorterController.render();
  //    this._sorterController.setSorterTypeHandler(this._onSortTypeChange);
      this._renderSortEventsByDefault(this._tripDaysListElement, this._events);
    }
  }

  _renderStatsPage() {
    this._statsController = new StatsController(this._pageBodyContainer, this._eventsModel);
    this._statsController.render();
  }

  _renderEvents(events, container) {
    return events.map((eventItem) => {
      const eventsController = new EventsController(container, this._onDataChange, this._onViewChange);
      eventsController.render(eventItem.id, eventItem, this._destinationsModel, this._offersModel, Mode.EDIT);
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
    render(this._container, this._tripDaysListElement);
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

  _renderAddEventsButton(container) {
    this._newEventId = this._eventsModel.getEvents().length;
    this._addEventFormController = new EventsController(container, this._onDataChange, this._onViewChange);
    this._addEventFormController.render({}, this._destinationsModel, this._offersModel, Mode.ADD);
  }

  _onSortTypeChange(sortType) {                 console.log('sort', sortType);
    this._sortType = sortType;
    this._eventsModel.setSorter(sortType);
    this._renderWithSortType();
  }
                                                         /*       _onFilterTypeChange(filterType) {
                                                               this._filterType = filterType;
                                                               this._eventsModel.setFilter(filterType);
                                                               this._renderWithFilterType();
                                                               }
                                                               _renderWithFilterType() {
                                                                 const events = this._eventsModel.getEvents();
                                                                 if (this._filterType !== FilterType.EVERYTHING) {
                                                                   this._eventsControllers = this._renderSortEvents(events);
                                                                     } else {
                                                                    this._renderSortEventsByDefault(this._tripDaysListElement, events);
                                                                 }
                                                               }*/
  _removeEvents() {
    this._eventsControllers.forEach((eventController) => eventController.destroy());
    this._eventsControllers = [];
  }

  hide() {
    this._container.classList.add(HIDE_CLASS);
  }

  _updateEvents(newData) {
    this._removeEvents();
    this._renderEvents(newData, this._tripDaysListElement);
  }
  
  _onViewChange() {
    this._eventsControllers.forEach((it) => it.setDefaultView());
  }
    /*if (newEvent === null) {
      this._api.deletePoint(oldEvent.id).then(() => {
        this._removePoint(pointController, oldEvent.id);
        return;
      });
    }
    if (oldEvent === null) {
      this._api.createPoints(newEvent).then((point) => {
        this._eventsModel.addEvent(point);
        this._onViewChange();
        return;
      });
    }*/
//    if (newEvent && oldEvent) {
      /*this._api.updatePoint(oldEvent.id, newEvent).then((point) => {
        
      });
    }*/
// this._api.updatePoint(oldEvent.id, newEvent)
       /*   .then((eventsModel) => {
          this._eventsModel.updateEvent(oldEvent.id, newEvent);
        //  if (isSuccess) {
            this._eventsModel.updateEvent(oldEvent.id, newEvent);
            eventsController.render(oldEvent.id, newEvent, this._destinationsModel, this._offersModel, Mode.VIEW);
            //renderEvents(newEvent);
            this._updateEvents(newEvent);
            
        //  }
        });*/
       /* if (newEvent && oldEvent) {
        this._api.updatePoint(oldEvent.id, newEvent).then((point) => {
          this._eventsModel.updateEvent(point.id, point);
        });
      }*/
      
  _onDataChange(eventsController, oldEvent, newEvent) {
      if (newEvent && oldEvent) {
      this._api.updatePoint(oldEvent.id, newEvent).then((point) => {
        this._eventsModel.updateEvent(point.id, point);
      });
    }

  }
}

export default TripController;
