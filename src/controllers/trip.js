import {render} from '../utils/render';
import {remove} from '../utils/render';
import {SortType} from '../components/event-sorter';
import NoEventsComponent from '../components/no-events';
import TripDaysListComponent from '../components/trip-days-list';
import TripDayComponent from '../components/trip-day';
import {calcDuration} from '../components/templates/date';
import EventsController from './events';
import SorterController from './sort';
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
    this._thipDaysComponent = [];
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    eventsModel.setFilterChangeHandler(this._onFilterChange);
    eventsModel.setSorterChangeHandler(this._onSortTypeChange);
    eventsModel.addDataChangeHandler(this._onDataChange);
  }

  render() {
    this._noEventComponent = new NoEventsComponent();
    this._events = this._eventsModel.getEvents();

    if (this._events.length === 0) {
      render(this._tripEvents, this._noEventComponent.getElement());
    } else {
      this._tripDaysListElement = new TripDaysListComponent().getElement();
      this._sorterController = new SorterController(this._container, this._eventsModel);
      this._sorterController.render();
      this._sorterController.setSorterTypeHandler(this._onSortTypeChange);
      this._renderSortEventsByDefault(this._tripDaysListElement, this._events);
    }
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
      this._tripDayComponent = new TripDayComponent(day, dayEvents, i);
      this._thipDaysComponent.push(this._tripDayComponent);
      render(container, this._tripDayComponent.getElement());
      return this._renderEvents(dayEvents, this._tripDayComponent.getElement().children[1]);
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
    const tripDayComponent = new TripDayComponent();
    render(this._tripDaysListElement, tripDayComponent.getElement());
    const tripEventsList = tripDayComponent.getElement().querySelector(`.trip-events__list`);
    this._eventsControllers = this._renderEvents(events, tripEventsList);
    
    return this._eventsControllers;
  }

  renderAddEventsButton(addEventButtonComponent) {
    this._onViewChange();
    this._addEventButtonComponent = addEventButtonComponent;
    this._addEventButtonComponent.setDisabled(true);

    this._newEventId = this._eventsModel.getEvents().length;
    this._addEventFormController = new EventsController(this._tripDaysListElement, this._onDataChange, this._onViewChange);
    this._addEventFormController.render(this._newEventId, {}, this._destinationsModel, this._offersModel, Mode.ADD);
  }

  _onSortTypeChange(sortType) {
    let sortedEvents = [];
    this._sortType = sortType;
    switch (sortType) {
      case SortType.TIME:
        sortedEvents = this._events.slice().sort((a, b) => calcDuration(b.endDate, b.startDate) - calcDuration(a.endDate, a.startDate));
        this._sortEvents(sortedEvents, sortType);
        break;
     case SortType.PRICE:  
       sortedEvents = this._events.slice().sort((a, b) => a.price - b.price);
       this._sortEvents(sortedEvents, sortType);
       break;
     case SortType.EVENT:
       this._sortEvents(sortedEvents, sortType);
     }
  }  

  _removeEvents() {
    this._eventsControllers.forEach((eventController) => eventController.destroy());
    this._eventsControllers = [];
  }

  hide() {
    this._container.classList.add(HIDE_CLASS);
  }

  _updateEvents() {
    this._thipDaysComponent.forEach((day) => remove(day));
    this._removeEvents();
    this._renderSortEventsByDefault(this._tripDaysListElement, this._events);
  }
   
  _sortEvents(sortedEvents, sortType) {
    this._thipDaysComponent.forEach((day) => remove(day));
    
    if (sortType === SortType.EVENT) {
      this._removeEvents(); this._renderSortEventsByDefault(this._tripDaysListElement, this._events);
    }
     else {
       this._removeEvents();
       this._renderSortEvents(sortedEvents);
     }
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

  _onFilterChange() {
    this._events = this._eventsModel.getEvents();
    this._updateEvents();
  }
}

export default TripController;
