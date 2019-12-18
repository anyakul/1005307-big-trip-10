import {RenderPosition, render} from './utils/render';

// ХЕДЕР

// Маршрут поездки
import TripInfoComponent from './components/trip-info';

// Фильтры
import {generateFiltersPoints} from './mock/filters';
import FiltersFormComponent from './components/event-filter';

// Меню
import SiteMenuComponent from './components/site-menu';
import {generateMenuPoints} from './mock/menu';

// MAIN
import TripController from './controllers/trip.js';
import {getTripInfoCost} from './mock/trip-event';
import {events} from './mock/trip-event';

const TRIP_COUNT = 2;
const FILTERS_COUNT = 2;
const MENU_COUNT = 2;

// ОТРИСОВКА ХЕДЕРА
const pageHeader = document.querySelector(`.page-header`);
const tripControls = pageHeader.querySelector(`.trip-controls`);
const tripInfo = pageHeader.querySelector(`.trip-info`);
const tripInfoCost = pageHeader.querySelector(`.trip-info__cost-value`);
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

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

const tripController = new TripController(tripEvents);
tripController.render(events);
