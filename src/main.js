import 'flatpickr/dist/flatpickr.min.css';
import TripController from './controllers/trip';
import EventsModel from './models/events';
import DestinationsModel from './models/destinations';
import OffersModel from './models/offers';
import API from './api';

const PageMode = {
  TABLE: `table`,
  STATS: `stats`,
};

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;
const api = new API(END_POINT, AUTHORIZATION);

const body = document.querySelector(`body`);

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const tripController = new TripController(body, eventsModel, destinationsModel, offersModel, api, PageMode.STATS);

Promise.all([api.getPoints(), api.getDestinations(), api.getOffers()]).then(([points, destinations, offers]) => {
  eventsModel.setEvents(points);
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);

  tripController.render(PageMode.TABLE);
});
