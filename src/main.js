// Функция для рендеринга компонентов
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Генерация событий дня
const CARD_COUNT = 5;
const events = generateEvents(CARD_COUNT);
import {generateEvent, generateEvents} from './mock/trip-event';

// ОТРИСОВКА ХЕДЕРА
const pageHeader = document.querySelector(`.page-header`);
const tripControls = pageHeader.querySelector(`.trip-controls`);

// Информация о городах поездки
import {createTripInfoTemplate} from './components/trip-info';
const TRIP_COUNT = 2;
const tripInfo = pageHeader.querySelector(`.trip-info`);
events.slice(1, TRIP_COUNT).forEach((events) => render(tripInfo, createTripInfoTemplate(events), `beforebegin`));

// Меню
import {createMenuTemplate} from './components/menu';
import {generateMenuPoints} from './mock/menu';
const MENU_COUNT = 2;
const menu = generateMenuPoints(MENU_COUNT);
menu.slice(1, MENU_COUNT).forEach((menu) => render(tripControls, createMenuTemplate(menu), `beforeend`));

// Фильтры
import {generateFiltersPoints} from './mock/filters';
import {createFiltersTemplate} from './components/filters-form';
const FILTERS_COUNT = 2;
const filters = generateFiltersPoints(FILTERS_COUNT);
filters.slice(1, FILTERS_COUNT).forEach((filters) => render(tripControls, createFiltersTemplate(filters), `beforeend`));

// ОТРИСОВКА MAIN
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

// Сортировка событий
import {createSortEventsTemplate} from './components/sort-events';
render(tripEvents, createSortEventsTemplate(), `beforeend`);

// форма создания или редактирования события
import {createEventFormTemplate} from './components/event-form';
render(tripEvents, createEventFormTemplate(), `beforeend`);

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
const DAYS_COUNT = 5;
//render(tripDays, createDaysTemplate(), `beforeend`);
events.slice(1, DAYS_COUNT).forEach((events) => render(tripDays, createDaysTemplate(), `beforeend`));

// Информация о дне
import {createDaysInfoTemplate} from './components/day-info';
const days = generateMenuPoints(MENU_COUNT);
const day = pageMain.querySelector(`.day`);
const EVENT_COUNT = 2
events.slice(1, EVENT_COUNT).forEach((events) => render(day, createDaysInfoTemplate(events), `beforeend`));

// Список событий дня
const createEventsListTemplate = () => {
  return (`<ul class="trip-events__list"></ul>`);
};
render(day, createEventsListTemplate(), `beforeend`);

// Добавление карточек событий
import {createCardTemplate} from './components/event-card';
const SHOWING_EVENTS_COUNT_ON_START = 1;
const tripEventList = pageMain.querySelector(`.trip-events__list`);
events.slice(1, CARD_COUNT).forEach((events) => render(tripEventList, createCardTemplate(events), `beforeend`));

console.log(events);
console.log(createCardTemplate(events));