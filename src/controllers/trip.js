import {isEscKey} from '../utils/key-board';
import {RenderPosition, render, replace} from '../utils/render';

// MAIN
import BoardTripDaysComponent from '../components/board-trip-days';
import BoardDayComponent from '../components/board-day';
import {CARD_COUNT} from '../mock/trip-event';

// Форма сортировки
import SortEventsFormComponent from '../components/sort-events-form';

// Информация о дне
import DayInfoComponent from '../components/day-info';

// События дня
import BoardEventsListComponent from '../components/board-events-list';
import EventCardComponent from '../components/event-card';

// Форма редактирования события
import EditEventFormComponent from '../components/edit-event-form';

// Сообщения об отсутствии точек маршрута
import NoEventsComponent from '../components/no-events';


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

const DAYS_COUNT = 2;

export default class TripController {

  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEventsComponent();
    this._sortEventsFormComponent = new SortEventsFormComponent();
    this._tripDaysComponent = new BoardTripDaysComponent();
    this._dayComponent = new BoardDayComponent();
    this._eventsListComponent = new BoardEventsListComponent();
  }

  render(events) {
    const container = this._container;
    const isAllEventsArchived = events.every((eventItem) => eventItem.isArchive);
    if (isAllEventsArchived) {
      render(container, new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
      return;
    }
    render(container, this._sortEventsFormComponent, RenderPosition.BEFOREEND);
    render(container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    const boardTripDays = container.querySelector(`.trip-days`);
    render(boardTripDays, this._dayComponent, RenderPosition.BEFOREEND);

    const boardDay = boardTripDays.querySelector(`.day`);
    render(boardDay, this._eventsListComponent, RenderPosition.BEFOREEND);

    const boardEventsList = boardDay.querySelector(`.trip-events__list`);

    events.slice(0, CARD_COUNT)
      .forEach((eventItem) => {
        renderEvent(boardEventsList, eventItem);
      });
    events.slice(1, DAYS_COUNT).forEach((eventItem) => render(boardDay, new DayInfoComponent(eventItem), RenderPosition.AFTERBEGIN));
  }
}
