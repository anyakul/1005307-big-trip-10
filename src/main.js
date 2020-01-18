import 'flatpickr/dist/flatpickr.min.css';
import TripController from './controllers/trip';
import {events} from './mock/trip-event';
import EventsModel from './models/events';
import API from './api';

const body = document.querySelector(`body`);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const tripController = new TripController(body, eventsModel);
tripController.render();
