import {RenderPosition, render} from '../utils/render';
import SiteMenuComponent from '../components/site-menu';
import EventFilterComponent from '../components/event-filter';

// Форма сортировки
import EventSorterComponent, {SortType} from '../components/event-sorter';

// Информация о дне
import DayComponent from '../components/day';

// События дня
import NoEventsComponent from '../components/no-events';
import PointController from './point';

const renderEvents = (eventsListElement, events) => {
  return events.map((eventItem) => {
    const pointController = new PointController(eventsListElement);
    pointController.render(eventItem);

    return pointController;
  });
};

const renderDay = (tripEventsElement, events) => {
  const DayComponents = new DayComponent(events);
  render(tripEventsElement, DayComponents, RenderPosition.BEFOREEND);
};

export default class TripController {

  constructor(container) {
    this._container = container;
    this._events = [];
    this._days = [];
    this._siteMenuComponent = new SiteMenuComponent();
    this._eventFilter = new EventFilterComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._eventSorterComponent = new EventSorterComponent();
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
    renderDay(tripEvents, events);
    const boardEventsList = this._container.querySelector(`.trip-events__list`);

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
