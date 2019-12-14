import {RenderPosition, render, isEscKey} from './utils';

// ХЕДЕР

// Маршрут поездки
import TripInfoComponent from './components/trip-info';

// Фильтры
import {generateFiltersPoints} from './mock/filters';
import FiltersFormComponent from './components/filters-form';

// Меню
import SiteMenuComponent from './components/site-menu';
import {generateMenuPoints} from './mock/menu';

// MAIN
import BoardTripDaysComponent from './components/board-trip-days';
import BoardDayComponent from './components/board-day';

// Форма сортировки
import SortEventsFormComponent from './components/sort-events-form';

// Информация о дне
import DayInfoComponent from './components/day-info';

// События дня
import BoardEventsListComponent from './components/board-events-list';
import EventCardComponent from './components/event-card';
import {getTripInfoCost, generateEvents} from './mock/trip-event';

// Форма редактирования события
import EditEventFormComponent from './components/edit-event-form';

// Сообщения об отсутствии точек маршрута
import NoEventsComponent from './components/no-events';

// форма редактирования события и карточки событий


const renderEvent = (eventListElement, card) => {
  const onEscKeyDown = (evt) => {

    if (isEscKey(evt)) {
      replaceEventToEdit();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToEvent = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEventToEdit = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const eventComponent = new EventCardComponent(card);
  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);

  editButton.addEventListener(`click`, () => {
    replaceEditToEvent();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const eventEditComponent = new EditEventFormComponent(card);
  const editForm = eventEditComponent.getElement();

  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEventToEdit();
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

// Генерация событий дня
const CARD_COUNT = 5;
const events = generateEvents(CARD_COUNT);
events.sort((a, b) => Date.parse(a.startDate) > Date.parse(b.startDate) ? 1 : -1);

// ОТРИСОВКА ХЕДЕРА
const pageHeader = document.querySelector(`.page-header`);
const tripControls = pageHeader.querySelector(`.trip-controls`);
const tripInfo = pageHeader.querySelector(`.trip-info`);
const tripInfoCost = pageHeader.querySelector(`.trip-info__cost-value`);
const TRIP_COUNT = 2;
const FILTERS_COUNT = 2;
const MENU_COUNT = 2;
const EVENT_COUNT = 2;

// Информация о стоимости поездки
tripInfoCost.textContent = getTripInfoCost(events);

// Информация о городах поездки
events.slice(1, TRIP_COUNT).forEach((eventItem) => render(tripInfo, new TripInfoComponent(eventItem).getElement(), RenderPosition.BEFOREEND));

// Фильтры
const filters = generateFiltersPoints(FILTERS_COUNT);
filters.slice(1, FILTERS_COUNT).forEach((filtersItem) => render(tripControls, new FiltersFormComponent(filtersItem).getElement(), RenderPosition.BEFOREEND));

// Меню
const menu = generateMenuPoints(MENU_COUNT);
menu.slice(1, MENU_COUNT).forEach((menuItem) => render(tripControls, new SiteMenuComponent(menuItem).getElement(), RenderPosition.BEFOREEND));

// ОТРИСОВКА MAIN
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

// Список событий дня
const isAllEventsArchived = events.every((eventItem) => eventItem.isArchive);

const renderBoard = (boardComponent, eventItems) => {
  if (isAllEventsArchived) {
    render(boardComponent.getElement(), new NoEventsComponent().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(boardComponent, new BoardTripDaysComponent().getElement(), RenderPosition.BEFOREEND);
  render(boardComponent, new SortEventsFormComponent().getElement(), RenderPosition.BEFOREEND);

  const boardTripDays = boardComponent.querySelector(`.trip-days`);
  render(boardTripDays, new BoardDayComponent().getElement(), RenderPosition.BEFOREEND);

  const boardDay = boardTripDays.querySelector(`.day`);
  render(boardDay, new BoardEventsListComponent().getElement(), RenderPosition.BEFOREEND);

  const boardEventsList = boardDay.querySelector(`.trip-events__list`);

  events.slice(0, CARD_COUNT)
    .forEach((eventItem) => {
      renderEvent(boardEventsList, eventItem);
    });
  eventItems.slice(1, EVENT_COUNT).forEach((eventItem) => render(boardDay, new DayInfoComponent(eventItem).getElement(), RenderPosition.AFTERBEGIN));
};

renderBoard(tripEvents, events);
