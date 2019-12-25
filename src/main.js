import TripController from './controllers/trip.js';
import {getTripInfoCost} from './mock/trip-event';
import {events} from './mock/trip-event';

const body = document.querySelector(`body`);
const pageHeader = body.querySelector(`.page-header`);
const tripInfoCost = pageHeader.querySelector(`.trip-info__cost-value`);

tripInfoCost.textContent = getTripInfoCost(events);

const tripController = new TripController(body);
tripController.render(events);
