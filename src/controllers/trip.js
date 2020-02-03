import {RenderPosition, render, remove} from '../utils/render';
import {isSameDay} from '../utils/date';
import {getEventsBySorter} from '../utils/sort';

import EventSorterComponent, {SortType} from '../components/event-sorter';
import NoEventsComponent from '../components/no-events';
import TripDaysListComponent from '../components/trip-days-list';
import TripDayComponent from '../components/trip-day';
import {Mode, ActionType} from '../components/event-editor';

import EventController from './event';

const HIDE_CLASS = `trip-events--hidden`;

class TripController {
  constructor(container, eventsModel, destinationsModel, offersModel, api) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._api = api;

    this._addEventButtonComponent = null;
    this._creatingEvent = null;
    this._eventSorterComponent = null;

    this._thipDays = [];
    this._eventControllers = [];

    this._sortType = SortType.EVENT;

    this._dispatch = this._dispatch.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    eventsModel.addOnFilterChange(this._onFilterChange);
  }

  render() {
    const container = this._container;

    if (this._eventsModel.isEmpty()) {
      render(container, new NoEventsComponent().getElement());
      return;
    }

    if (this._eventSorterComponent === null) {
      this._renderSorter();
    }

    this._tripDaysListElement = new TripDaysListComponent().getElement();
    this._renderSortEventsByDefault(this._tripDaysListElement, this._getEvents());
  }

  show() {
    this._container.classList.remove(HIDE_CLASS);
  }

  hide() {
    this._container.classList.add(HIDE_CLASS);
  }

  renderAddEventsButton(addEventButtonComponent) {
    this._onViewChange();

    this._addEventButtonComponent = addEventButtonComponent;
    this._addEventButtonComponent.setDisabled(true);

    this._newEventId = this._eventsModel.getEvents().length;

    this._addEventFormController = new EventController(
      this._tripDaysListElement,
      this._dispatch,
    );

    this._addEventFormController.render(
      eventItem,
      this._destinationsModel,
      this._offersModel,
      Mode.EDIT
    );

    this._eventControllers.push(this._addEventFormController);
  }

  _getEvents() {
    return getEventsBySorter(
      this._eventsModel.getEvents(),
      this._sortType
    );
  }

  _renderSorter() {
    this._eventSorterComponent = new EventSorterComponent(this._sortType);
    this._eventSorterComponent.setOnSortTypeChange(this._onSortTypeChange);

    render(this._container, this._eventSorterComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderEvents(events, container) {
    return events.map((eventItem) => {
      const controller = new EventController(
        container,
        this._dispatch,
      );

      controller.render(
        eventItem,
        this._destinationsModel,
        this._offersModel,
        Mode.EDIT
      );

      return controller;
    });
  }

  _renderTripDays(container, eventsDates, events) {
    return eventsDates.map((day, i) => {
      const dayEvents = events.filter((event) => isSameDay(event.startDate, day));

      this._tripDayComponent = new TripDayComponent(day, dayEvents, i);
      this._thipDays.push(this._tripDayComponent);

      render(container, this._tripDayComponent.getElement());

      return this._renderEvents(dayEvents, this._tripDayComponent.getElement().children[1]);
    });
  }

  _renderSortEventsByDefault(component, events) {
    const eventsDates = this._eventsModel.getPointsDates(events);

    render(this._container, this._tripDaysListElement);

    this._eventControllers = this._renderTripDays(component, eventsDates, events)
      .reduce((days, day) => days.concat(day), []);

    return this._eventControllers;
  }

  _renderSortEvents() {
    this._removeEvents();
    this._tripDayComponent = new TripDayComponent();

    render(this._tripDaysListElement, this._tripDayComponent.getElement());

    const tripEventsList = this._tripDayComponent.getElement().querySelector(`.trip-events__list`);

    this._eventControllers = this._renderEvents(this._getEvents(), tripEventsList);

    return this._eventControllers;
  }

  _onSortTypeChange(sortType) {
    this._sortType = sortType;

    this._thipDays.forEach(remove);

    if (sortType === SortType.EVENT) {
      this._updateEvents();
    } else {
      this._renderSortEvents();
    }
  }

  _removeEvents() {
    remove(this._tripDayComponent);

    this._eventControllers.forEach((eventController) => eventController.destroy());
    this._eventControllers = [];
  }

  _updateEvents() {
    this._thipDays.forEach(remove);
    this._removeEvents();
    this._renderSortEventsByDefault(this._tripDaysListElement, this._getEvents());
  }

  _setDefaultViews() {
    this._eventControllers.forEach((it) => it.setDefaultView());
  }

  _dispatch(controller, action) {
    const {type, payload} = action;

    switch (type) {
      case ActionType.CANCEL:
        controller.destroy();
        break;

      case ActionType.EDIT:
        this._setDefaultViews();
        break;

      case ActionType.ADDED_TO_FAVORITE:
        return this._api.updatePoint(payload.id, payload)
          .then((newEvent) => {
            const isSuccess = this._eventsModel.updateEvent(newEvent.id, newEvent);

            if (isSuccess) {
              controller.render(
                newEvent,
                this._destinationsModel,
                this._offersModel
              );
            }
          })
          .catch((err) => {
            controller.shake();
          });

        break;
        
      case ActionType.SUBMIT:
        return this._api.updatePoint(payload.id, payload)
          .then((newEvent) => {
            const isSuccess = this._eventsModel.updateEvent(newEvent.id, newEvent);

            if (isSuccess) {
              controller.destroy();
              this._onSortTypeChange(this._sortType);
            }
          })
          .catch((err) => {
            controller.shake();
          });
        
        break;
        
      case ActionType.DELETE:
        return this._api.deletePoint(payload)
          .then((isSuccess) => {
            if (isSuccess) {
              this._eventsModel.removeEvent(payload);

              controller.destroy();
              this._onSortTypeChange(this._sortType);
            }
          })
          .catch((err) => {
            controller.shake();
          });

        break;
    }
  }

  _onFilterChange() {
    if (this._sortType === SortType.EVENT) {
      this._updateEvents();
    } else {
      this._renderSortEvents();
    }
  }
}

export default TripController;
