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
const tripInfo = pageHeader.querySelector(`.trip-info`);
const tripInfoCost = pageHeader.querySelector(`.trip-info__cost-value`);
const body = document.querySelector(`body`);

// Информация о городах поездки
events.slice(1, 2).forEach((eventItem) => render(tripInfo, new TripInfoComponent(eventItem), RenderPosition.AFTERBEGIN));

// Информация о стоимости поездки
tripInfoCost.textContent = getTripInfoCost(events);

// ОТРИСОВКА MAIN

const tripController = new TripController(body);
tripController.render(events);
