import {RenderPosition, render, remove} from '../utils/render';
import TripInfoComponent from '../components/trip-info';
import SiteMenuComponent from '../components/site-menu';
import EventFilterComponent from '../components/event-filter';
import TripCostComponent from '../components/trip-cost';
import AddEventButtonComponent from '../components/add-event-button';

// Форма сортировки
import EventSorterComponent, {SortType} from '../components/event-sorter';

// Информация о дне
import DayBoardComponent, {generateTripDays} from '../components/day-board';

// События дня
import PointController from './point';
import SortBoardComponent from '../components/sort-board';

class TripController {

  constructor(container) {
    this._container = container;
    this._events = null;
    this._siteMenuComponent = new SiteMenuComponent();
    this._eventFilterComponent = new EventFilterComponent();
    this._addEventButtonComponent = new AddEventButtonComponent();
    this._eventSorterComponent = new EventSorterComponent();
    this._pointController = new PointController();
  }

  render(events) {
    this._events = events;
    this._tripDays = generateTripDays(this._events);
    this._sortBoardContainer = new SortBoardComponent(this._events);
    this._tripCostComponent = new TripCostComponent(this._events);

    const header = this._container.querySelector(`header`);
    const tripMain = header.querySelector(`.trip-main`);
    const tripInfo = tripMain.querySelector(`.trip-info`);
    const tripControls = tripMain.querySelector(`.trip-controls`);

    render(tripMain, this._addEventButtonComponent, RenderPosition.BEFOREEND);
    render(tripInfo, this._tripCostComponent, RenderPosition.AFTERBEGIN);
    render(tripInfo, new TripInfoComponent(events[0]), RenderPosition.AFTERBEGIN);
    render(tripControls, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(tripControls, this._eventFilterComponent, RenderPosition.BEFOREEND);

    const sortEventsDefault = () => {
      if (this._sortBoardContainer) {
        remove(this._sortBoardContainer);
      }
      render(tripEvents, new DayBoardComponent(this._tripDays), RenderPosition.BEFOREEND);
      this._pointController.render(events);
    };

    const main = this._container.querySelector(`main`);
    const tripEvents = main.querySelector(`.trip-events`);

    render(tripEvents, this._eventSorterComponent, RenderPosition.BEFOREEND);
    sortEventsDefault();

    this._eventSorterComponent.setSortChangeHandler((sortType) => {
      let sortedEvents = [];

      switch (sortType) {
        case SortType.EVENT:
          sortEventsDefault();
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
          break;
      }
      if (sortType === SortType.TIME || sortType === SortType.PRICE) {
        if (this._sortBoardContainer) {
          remove(this._sortBoardContainer);
        }

        this._tripDaysContainer = main.querySelector(`.trip-days`);
        if (this._tripDaysContainer) {
          document.querySelector(`.trip-days`).remove();
        }

        render(tripEvents, this._sortBoardContainer, RenderPosition.BEFOREEND);
        this._pointController.renderSorted(sortedEvents);
      }
    });
  }
}

export default TripController;
