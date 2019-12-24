import {RenderPosition, render} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import {replace} from '../utils/render';
import SiteMenuComponent from '../components/site-menu';
import EventFilterComponent from '../components/event-filter';
import EventCardComponent from '../components/event-card';
import EditEventFormComponent from '../components/edit-event-form';
import {showDate} from '../utils/date';

// Форма сортировки
import EventSorterComponent, {SortType} from '../components/event-sorter';

// Информация о дне
import DayComponent from '../components/day';
import {generateTripDays} from '../mock/trip-event';

// События дня
import NoEventsComponent from '../components/no-events';

const renderEvent = (card) => {
  const {dateFromUnix} = card;
  const onEscKeyDown = (evt) => {

    if (isEscKey(evt)) {
      replaceEventToEdit();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToEvent = () => {
    replace(eventEditComponent, eventComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEventToEdit = () => {
    replace(eventComponent, eventEditComponent);
  };

  const eventComponent = new EventCardComponent(card);

  eventComponent.setEditButtonClickHandler(replaceEditToEvent);

  const eventEditComponent = new EditEventFormComponent(card);
  eventEditComponent.setSubmitHandler(replaceEventToEdit);

  const tripEventsList = document.querySelectorAll(`.trip-events__list`);

  tripEventsList.forEach((tripEventItem) => {
    if (showDate(tripEventItem.dataset.date) === `${showDate(dateFromUnix)}`) {
      render(tripEventItem, eventComponent, RenderPosition.BEFOREEND);
    }
  });
};


export default class TripController {

  constructor(container) {
    this._container = container;
    this._siteMenuComponent = new SiteMenuComponent();
    this._eventFilter = new EventFilterComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._eventSorterComponent = new EventSorterComponent();
  }

  render(events) {
    this._events = events;
    this._tripDays = generateTripDays(this._events);
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
    render(tripEvents, new DayComponent(this._tripDays), RenderPosition.BEFOREEND);

    events.forEach((eventItem) => {
        renderEvent(eventItem);
      });
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
  }
}
