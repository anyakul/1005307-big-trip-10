import {isEscKey} from '../utils/key-board';
import {RenderPosition, render, replace} from '../utils/render';
import {SortType} from '../components/event-sorter';

import SiteMenuComponent from '../components/site-menu';
import FiltersFormComponent from '../components/event-filter';

// MAIN
import BoardTripDaysComponent from '../components/board-trip-days';
import BoardDayComponent from '../components/board-day';
import {CARD_COUNT} from '../mock/trip-event';

// Форма сортировки
import SortEventsFormComponent from '../components/event-sorter';

// Информация о дне
import DayInfoComponent from '../components/day-info';

// События дня
import BoardEventsListComponent from '../components/board-events-list';
import EventCardComponent from '../components/event-card';

// Форма редактирования события
import EditEventFormComponent from '../components/edit-event-form';

// Сообщения об отсутствии точек маршрута
import NoEventsComponent from '../components/no-events';

const DAYS_COUNT = 2;

const renderEvent = (eventListElement, card) => {
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

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

const showEvents = (events, container) => {
  events.slice(0, CARD_COUNT)
    .forEach((eventItem) => {
      renderEvent(container, eventItem);
    });
};

export default class TripController {

  constructor(tripControlsContainer, tripEventsContainer) {
    this._tripControlsContainer = tripControlsContainer;
    this._tripEventsContainer = tripEventsContainer;
    this._siteMenuComponent = new SiteMenuComponent();
    this._filtersFormComponent = new FiltersFormComponent();
    this._noEventsComponent = new NoEventsComponent();
    this._sortEventsFormComponent = new SortEventsFormComponent();
    this._tripDaysComponent = new BoardTripDaysComponent();
    this._dayComponent = new BoardDayComponent();
    this._eventsListComponent = new BoardEventsListComponent();
  }

  render(events) {
    render(this._tripControlsContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._tripControlsContainer, this._filtersFormComponent, RenderPosition.BEFOREEND);

    const isAllEventsArchived = events.every(({isArchive}) => isArchive);
    if (isAllEventsArchived) {
      render(this._tripEventsContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }
    render(this._tripEventsContainer, this._sortEventsFormComponent, RenderPosition.BEFOREEND);
    render(this._tripEventsContainer, this._tripDaysComponent, RenderPosition.BEFOREEND);

    const boardTripDays = this._tripEventsContainer.querySelector(`.trip-days`);
    render(boardTripDays, this._dayComponent, RenderPosition.BEFOREEND);

    const boardDay = boardTripDays.querySelector(`.day`);
    render(boardDay, this._eventsListComponent, RenderPosition.BEFOREEND);

    const boardEventsList = boardDay.querySelector(`.trip-events__list`);
    showEvents(events, boardEventsList);
    events.slice(1, DAYS_COUNT).forEach((eventItem) => render(boardDay, new DayInfoComponent(eventItem), RenderPosition.AFTERBEGIN));

    this._sortEventsFormComponent.setSortChangeHandler((sortType) => {
      let sortedEvents = [];

      switch (sortType) {
        case SortType.PRICE:
          sortedEvents = events.sort((a, b) => b.basePrice - a.basePrice);
          break;

        case SortType.TIME:
          sortedEvents = events.slice().sort((a, b) => {
            const durationFirst = a.dateToUnix - a.dateFromUnix;
            const durationSecond = b.dateToUnix - b.dateFromUnix;

            return durationSecond - durationFirst;
          });
          boardEventsList.innerHTML = ``;
          showEvents(sortedEvents, boardEventsList);
      }
    });
  }
}
