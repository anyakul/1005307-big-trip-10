import TripController from './controllers/trip.js';
import {events} from './mock/trip-event';

const body = document.querySelector(`body`);

const tripController = new TripController(body);
tripController.render(events);
