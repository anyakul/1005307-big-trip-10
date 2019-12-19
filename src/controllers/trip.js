import {RenderPosition, render} from '../utils/render';

import SiteMenuComponent from '../components/site-menu';
import EventFilterComponent from '../components/event-filter';

// MAIN
import BoardTripDaysComponent from '../components/board-trip-days';
import BoardDayComponent from '../components/board-day';

// Форма сортировки
import EventSorterComponent, {SortType} from '../components/event-sorter';

// Информация о дне
import DayInfoComponent from '../components/day-info';

// События дня
import BoardEventsListComponent from '../components/board-events-list';

// Сообщения об отсутствии точек маршрута
import NoEventsComponent from '../components/no-events';
import PointController from './point';

const renderEvents = (eventsListElement, events) => {
  return events.map((eventItem) => {
    const pointController = new PointController(eventsListElement);
    pointController.render(eventItem);

    return pointController;
  });
};

export default class TripController {

  constructor(container) {
    this._container = container;
    this._events = [];
    this._siteMenuComponent = new SiteMenuComponent();
    this._eventFilter = new EventFilterComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._eventSorterComponent = new EventSorterComponent();
    this._tripDaysComponent = new BoardTripDaysComponent();
    this._dayComponent = new BoardDayComponent();
    this._eventsListComponent = new BoardEventsListComponent();
  }

  render(events) {
    this._events = events;
    const header = this._container.querySelector(`header`);
    const tripControls = header.querySelector(`.trip-controls`);
    render(tripControls, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(tripControls, this._eventFilter, RenderPosition.BEFOREEND);

    const main = this._container.querySelector(`main`);
    const tripEvents = main.querySelector(`.trip-events`);

    const isAllEventsArchived = events.every(({isArchive}) => isArchive);
    if (isAllEventsArchived) {
      render(this._tripEventsContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }
    render(tripEvents, this._eventSorterComponent, RenderPosition.BEFOREEND);
    render(tripEvents, this._tripDaysComponent, RenderPosition.BEFOREEND);

    const boardTripDays = tripEvents.querySelector(`.trip-days`);
    render(boardTripDays, this._dayComponent, RenderPosition.BEFOREEND);

    const boardDay = boardTripDays.querySelector(`.day`);
    render(boardDay, this._eventsListComponent, RenderPosition.BEFOREEND);

    const boardEventsList = this._container.querySelector(`.trip-events__list`);
    events.slice(1, 2).forEach((eventItem) => render(boardDay, new DayInfoComponent(eventItem), RenderPosition.AFTERBEGIN));

    this._eventSorterComponent.setSortChangeHandler((sortType) => {
      let sortedEvents = [];

      switch (sortType) {
        case SortType.EVENT:
          sortedEvents = events.sort((a, b) => b.dateFromUnix - a.dateToUnix);
          break;

        case SortType.PRICE:
          sortedEvents = events.sort((a, b) => b.basePrice - a.basePrice);
          break;

        case SortType.TIME:
          sortedEvents = events.slice().sort((a, b) => {
            const durationFirst = a.dateToUnix - a.dateFromUnix;
            const durationSecond = b.dateToUnix - b.dateFromUnix;

            return durationSecond - durationFirst;
          });
      }
      boardEventsList.innerHTML = ``;
      renderEvents(boardEventsList, sortedEvents.slice(0, 5));
    });

    renderEvents(boardEventsList, this._events.slice(0, 5));
  // this._showedPointsControllers = this._showedPointsControllers.concat(newEvent);
  }
}
