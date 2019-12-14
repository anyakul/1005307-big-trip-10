import {isEscKey} from './utils/key-board';
import {RenderPosition, render, replace} from './utils/render';

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
    replace(eventEditComponent, eventComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEventToEdit = () => {
    replace(eventComponent, eventEditComponent);
  };

  const eventComponent = new EventCardComponent(card);
  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);

  eventComponent.setEditButtonClickHandler(replaceEditToEvent);

  const eventEditComponent = new EditEventFormComponent(card);
  eventEditComponent.setSubmitHandler(replaceEventToEdit);

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
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

// Информация о городах поездки
events.slice(1, TRIP_COUNT).forEach((eventItem) => render(tripInfo, new TripInfoComponent(eventItem), RenderPosition.AFTERBEGIN));

// Информация о стоимости поездки
tripInfoCost.textContent = getTripInfoCost(events);

// Меню
const menu = generateMenuPoints(MENU_COUNT);
menu.slice(1, MENU_COUNT).forEach((menuItem) => render(tripControls, new SiteMenuComponent(menuItem), RenderPosition.BEFOREEND));

// Фильтры
const filters = generateFiltersPoints(FILTERS_COUNT);
filters.slice(1, FILTERS_COUNT).forEach((filtersItem) => render(tripControls, new FiltersFormComponent(filtersItem), RenderPosition.BEFOREEND));

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
  render(boardComponent, new SortEventsFormComponent(), RenderPosition.BEFOREEND);
  render(boardComponent, new BoardTripDaysComponent(), RenderPosition.BEFOREEND);
  

  const boardTripDays = boardComponent.querySelector(`.trip-days`);
  render(boardTripDays, new BoardDayComponent(), RenderPosition.BEFOREEND);

  const boardDay = boardTripDays.querySelector(`.day`);
  render(boardDay, new BoardEventsListComponent(), RenderPosition.BEFOREEND);

  const boardEventsList = boardDay.querySelector(`.trip-events__list`);

  events.slice(0, CARD_COUNT)
    .forEach((eventItem) => {
      renderEvent(boardEventsList, eventItem);
    });
  eventItems.slice(1, EVENT_COUNT).forEach((eventItem) => render(boardDay, new DayInfoComponent(eventItem), RenderPosition.AFTERBEGIN));
};

renderBoard(tripEvents, events);
