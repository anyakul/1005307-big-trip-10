import {render} from './utils';
import {generateEvents} from './mock/trip-event';
import {createTripInfoTemplate} from './components/trip-info';
import {createMenuTemplate} from './components/menu';
import {generateMenuPoints} from './mock/menu';
import {generateFiltersPoints} from './mock/filters';
import {createFiltersTemplate} from './components/filters-form';
import {createSortEventsTemplate} from './components/sort-events';
import {createEventFormTemplate} from './components/event-form';
import {createDayInfoTemplate} from './components/day-info';
import {createCardTemplate} from './components/event-card';

// Генерация событий дня
const CARD_COUNT = 5;
const events = generateEvents(CARD_COUNT);

// ОТРИСОВКА ХЕДЕРА
const pageHeader = document.querySelector(`.page-header`);
const tripControls = pageHeader.querySelector(`.trip-controls`);

// Информация о городах поездки
const TRIP_COUNT = 2;
const tripInfo = pageHeader.querySelector(`.trip-info`);
events.slice(1, TRIP_COUNT).forEach((eventItem) => render(tripInfo, createTripInfoTemplate(eventItem), `beforebegin`));

// Меню
const MENU_COUNT = 2;
const menu = generateMenuPoints(MENU_COUNT);
menu.slice(1, MENU_COUNT).forEach((menuItem) => render(tripControls, createMenuTemplate(menuItem), `beforeend`));

// Фильтры
const FILTERS_COUNT = 2;
const filters = generateFiltersPoints(FILTERS_COUNT);
filters.slice(1, FILTERS_COUNT).forEach((filtersItem) => render(tripControls, createFiltersTemplate(filtersItem), `beforeend`));

// ОТРИСОВКА MAIN
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

// Сортировка событий
render(tripEvents, createSortEventsTemplate(), `beforeend`);

// форма создания или редактирования события
events.slice(1, 2).forEach((eventsItem) => render(tripEvents, createEventFormTemplate(eventsItem), `beforeend`));

// Список дней
const createTripsDayTemplate = () => {
  return (`<ul class="trip-days"></ul>`);
};
render(tripEvents, createTripsDayTemplate(), `beforeend`);

// Список дней
const createDaysTemplate = () => {
  return (`<li class="trip-days__item day"></li>`);
};
const tripDays = pageMain.querySelector(`.trip-days`);
render(tripDays, createDaysTemplate(), `beforeend`);

// Информация о дне
const day = pageMain.querySelector(`.day`);
const EVENT_COUNT = 2;
events.slice(1, EVENT_COUNT).forEach((eventsItem) => render(day, createDayInfoTemplate(eventsItem), `beforeend`));

// Список событий дня
const createEventsListTemplate = () => {
  return (`<ul class="trip-events__list"></ul>`);
};
render(day, createEventsListTemplate(), `beforeend`);

// Добавление карточек событий
const tripEventList = pageMain.querySelector(`.trip-events__list`);
events.slice(1, CARD_COUNT).forEach((eventsItem) => render(tripEventList, createCardTemplate(eventsItem), `beforeend`));
