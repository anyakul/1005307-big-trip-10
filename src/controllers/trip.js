import {RenderPosition, render, remove} from '../utils/render';
import TripInfoComponent from '../components/trip-info';
import SiteMenuComponent from '../components/site-menu';
import EventFilterComponent from '../components/event-filter';

// Форма сортировки
import EventSorterComponent, {SortType} from '../components/event-sorter';
import {getTripInfoCost} from '../mock/trip-event';

// Информация о дне
import DayComponent from '../components/day';
import {generateTripDays} from '../mock/trip-event';

// События дня
import NoEventsComponent from '../components/no-events';
import PointController from './point';
import SortComponent from '../components/sort';

class TripController {

  constructor(container) {
    this._container = container;
    this._siteMenuComponent = new SiteMenuComponent();
    this._eventFilter = new EventFilterComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._eventSorterComponent = new EventSorterComponent();
    this._pointController = new PointController();
    this._sortContainer = new SortComponent();
  }

  render(events) {
    this._events = events;
    this._tripDays = generateTripDays(this._events);

    this._header = this._container.querySelector(`header`);
    this._tripInfo = this._header.querySelector(`.trip-info`);
    this._tripInfoCost = this._header.querySelector(`.trip-info__cost-value`);
    this._tripControls = this._header.querySelector(`.trip-controls`);

    events.slice(1, 2).forEach((eventItem) => render(this._tripInfo, new TripInfoComponent(eventItem), RenderPosition.AFTERBEGIN));
    this._tripInfoCost.textContent = getTripInfoCost(this._events);

    render(this._tripControls, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._tripControls, this._eventFilter, RenderPosition.BEFOREEND);

    const sortEventsDefault = () => {
      if (this._sortContainer) {
        remove(this._sortContainer);
      }
      render(this._tripEvents, new DayComponent(this._tripDays), RenderPosition.BEFOREEND);
      this._pointController.render(events);
    };

    this._main = this._container.querySelector(`main`);
    this._tripEvents = this._main.querySelector(`.trip-events`);

    const isAllEventsArchived = this._events.every(({isArchive}) => isArchive);
    if (isAllEventsArchived) {
      render(this._tripEventsContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }
    render(this._tripEvents, this._eventSorterComponent, RenderPosition.BEFOREEND);
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
        if (this._sortContainer) {
          remove(this._sortContainer);
        }

        this._tripDaysContainer = this._main.querySelector(`.trip-days`);
        if (this._tripDaysContainer) {
          document.querySelector(`.trip-days`).remove();
        }

        render(this._tripEvents, this._sortContainer, RenderPosition.BEFOREEND);
        this._pointController.renderSorted(sortedEvents);
      }
    });
  }
}

export default TripController;
