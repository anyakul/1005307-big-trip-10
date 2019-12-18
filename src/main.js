import {RenderPosition, render} from './utils/render';

// ХЕДЕР

// Маршрут поездки
import TripInfoComponent from './components/trip-info';

// MAIN
import TripController from './controllers/trip.js';
import {getTripInfoCost} from './mock/trip-event';
import {events} from './mock/trip-event';

// ОТРИСОВКА ХЕДЕРА
const pageHeader = document.querySelector(`.page-header`);
const tripControls = pageHeader.querySelector(`.trip-controls`);
const tripInfo = pageHeader.querySelector(`.trip-info`);
const tripInfoCost = pageHeader.querySelector(`.trip-info__cost-value`);
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

const body = document.querySelector(`body`);

// Информация о городах поездки
events.slice(1, 2).forEach((eventItem) => render(tripInfo, new TripInfoComponent(eventItem), RenderPosition.AFTERBEGIN));

// Информация о стоимости поездки
tripInfoCost.textContent = getTripInfoCost(events);

// ОТРИСОВКА MAIN

const tripController = new TripController(body);
tripController.render(events);
