import {RenderPosition, render} from './utils';
import {generateEvents} from './mock/trip-event';

// ХЕДЕР

// Общая цена
import TotalPriceComponent from './components/total-price';

// Информация о городах поездки
import TripInfoComponent from './components/trip-info';

// Фильтры
import {generateFiltersPoints} from './mock/filters';
import FiltersComponent from './components/filters-form';

// Меню
import SiteMenuComponent from './components/menu';
import {generateMenuPoints} from './mock/menu';

// MAIN
import TripDaysListComponent from './components/trip-days-list';
import DayComponent from './components/day';

// Сортировка
import SortComponent from './components/sort-events';

// Информация о дне
import DayInfoComponent from './components/day-info';

// События дня
import TripEventsListComponent from './components/events-list';
import EventsCardComponent from './components/event-card';

/*

import {createEventFormTemplate} from './components/event-form';
*/

// Генерация событий дня
const CARD_COUNT = 5;
const events = generateEvents(CARD_COUNT);

// ОТРИСОВКА ХЕДЕРА
const pageHeader = document.querySelector(`.page-header`);
const tripControls = pageHeader.querySelector(`.trip-controls`);
const tripInfo = pageHeader.querySelector(`.trip-info`);
const TRIP_COUNT = 2;
const FILTERS_COUNT = 2;
const MENU_COUNT = 2;

// Общая сумма поездки
events.slice(1, TRIP_COUNT).forEach((eventItem) => render(tripInfo, new TotalPriceComponent(eventItem).getElement(), RenderPosition.BEFOREEND));

// Информация о городах поездки
events.slice(1, TRIP_COUNT).forEach((eventItem) => render(tripInfo, new TripInfoComponent(eventItem).getElement(), RenderPosition.BEFOREEND));

// Фильтры
const filters = generateFiltersPoints(FILTERS_COUNT);
filters.slice(1, FILTERS_COUNT).forEach((filtersItem) => render(tripControls, new FiltersComponent(filtersItem).getElement(), RenderPosition.BEFOREEND));

// Меню
const menu = generateMenuPoints(MENU_COUNT);
menu.slice(1, MENU_COUNT).forEach((menuItem) => render(tripControls, new SiteMenuComponent(menuItem).getElement(), RenderPosition.BEFOREEND));

// ОТРИСОВКА MAIN
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

/*
// форма создания или редактирования события
events.slice(1, 2).forEach((eventsItem) => render(tripEvents, createEventFormTemplate(eventsItem), `beforeend`));
*/

render(tripEvents, new TripDaysListComponent().getElement(), RenderPosition.BEFOREEND);
const tripDaysList = pageMain.querySelector(`.trip-days`);
render(tripDaysList, new DayComponent().getElement(), RenderPosition.BEFOREEND);

const day = pageMain.querySelector(`.day`);

// Список событий дня
render(day, new TripEventsListComponent().getElement(), RenderPosition.BEFOREEND);

// Добавление карточек событий
const tripEventList = pageMain.querySelector(`.trip-events__list`);
events.slice(1, CARD_COUNT).forEach((eventsItem) => render(tripEventList, new EventsCardComponent(eventsItem).getElement(), RenderPosition.BEFOREEND));

// Информация о дне
const EVENT_COUNT = 2;
events.slice(1, EVENT_COUNT).forEach((eventItem) => render(day, new DayInfoComponent(eventItem).getElement(), RenderPosition.BEFOREEND));

// Сортировка событий
render(tripEvents, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);
