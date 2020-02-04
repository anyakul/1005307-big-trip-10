import {RenderPosition, render, remove} from '../utils/render';
import {isSameDay} from '../utils/date';
import {getEventsBySorter} from '../utils/sort';

import EventSorterComponent, {SortType} from '../components/event-sorter';
import NoEventsComponent from '../components/no-events';
import TripDaysListComponent from '../components/trip-days-list';
import TripDayComponent from '../components/trip-day';
import {Mode, ActionType} from '../components/event-editor';

import EventController from './event';
import nanoid from 'nanoid';

const HIDE_CLASS = `trip-events--hidden`;

const createNewEvent = (id) => ({
  id,
  type: `sightseeing`,
  startDate: new Date(),
  endDate: new Date(),
  destination: {
    name: ``,
    description: ``,
    pictures: []
  },
  price: 0,
  offers: [],
  isFavorite: false
});

const getUniqueDays = (days) => {
  const uniqueDays = [];
  days.forEach((day, i) => {
    if (i === 0 || uniqueDays.every((it) => !isSameDay(it, day))) {
      uniqueDays.push(day);
    }
  });

  return uniqueDays;
};

const getEventDates = (events) => {
  const startDates = events
    .map(({startDate}) => startDate)
    .sort((a, b) => a - b);

  return getUniqueDays(startDates);
}

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
    this._addEventButtonComponent = addEventButtonComponent;
    this._addEventButtonComponent.setDisabled(true);

    const controller = new EventController(
      this._tripDaysListElement,
      this._dispatch,
    );

    controller.render(
      createNewEvent(nanoid()),
      this._destinationsModel,
      this._offersModel,
      Mode.ADD,
    );

    this._eventControllers.push(controller);
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
    const eventsDates = getEventDates(events);

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
      case ActionType.EDIT:
        this._setDefaultViews();
        break;
      case ActionType.UPDATE:
        this._handleUpdateAction(controller, payload);
        break;
      case ActionType.CREATE:
        this._handleCreateAction(controller, payload);
        break;
      case ActionType.DELETE:
        this._handleDeleteAction(controller, payload);
        break;
      case ActionType.CANCEL:
        this._handleCancelAction(controller);
        break;
      case ActionType.ADD_TO_FAVORITE:
        this._handleAddToFavoriteAction(controller, payload);
        break;
    }
  }

  _handleAddToFavoriteAction(controller, eventItem) {
    this._api.updatePoint(eventItem.id, eventItem)
      .then((newEvent) => {
        const isSuccess = this._eventsModel.updateEvent(newEvent.id, newEvent);

        if (isSuccess) {
          controller.render(newEvent, this._destinationsModel, this._offersModel);
        }
      })
      .catch(() => {
        controller.shake();
      });
  }

  _handleCancelAction(controller) {
    controller.destroy();

    if (this._addEventButtonComponent !== null) {
      this._addEventButtonComponent.setDisabled(false);
    }
  }

  _handleUpdateAction(controller, eventItem) {
    this._api.updatePoint(eventItem.id, eventItem)
      .then((newEvent) => {
        const isSuccess = this._eventsModel.updateEvent(newEvent.id, newEvent);

        if (isSuccess) {
          controller.destroy();
          this._onSortTypeChange(this._sortType);
        }
      })
      .catch(() => {
        controller.shake();
      });
  }

  _handleCreateAction(controller, newEvent) {
    return this._api.createPoint(newEvent)
      .then((newEvent) => {
        this._eventsModel.addEvent(newEvent);

        controller.destroy();
        this._onSortTypeChange(this._sortType);
      })
      .catch((err) => {
        controller.shake();
      });
  }

  _handleDeleteAction(controller, evenItem) {
    this._api.deletePoint(evenItem)
      .then((isSuccess) => {
        console.log('isSuccess', isSuccess);
        if (isSuccess) {
          this._eventsModel.removeEvent(evenItem);

          controller.destroy();
          this._onSortTypeChange(this._sortType);
        }
      })
      .catch(() => {
        controller.shake();
      });
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
