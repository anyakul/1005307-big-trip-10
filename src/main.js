import 'flatpickr/dist/flatpickr.min.css';
import TripController from './controllers/trip';
import EventsModel from './models/events';
import DestinationsModel from './models/destinations';
import OffersModel from './models/offers';
import API from './api';

const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;
const api = new API(END_POINT, AUTHORIZATION);

const body = document.querySelector(`body`);

const eventsModel = new EventsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const tripController = new TripController(body, eventsModel, destinationsModel, offersModel, api);

Promise.all([api.getPoints(), api.getDestinations(), api.getOffers()]).then(([points, destinations, offers]) => {
  eventsModel.setEvents(points);
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);
  
//  console.log('main', tripController);

  tripController.render();
  
   
 //         this.getElement().addEventListener(`change`, (evt) => {                 //  console.log( handler(evt.target.value));
 //          tripController.render();                                                                //  return   handler(evt.target.value);                            
                                                                           //   console.log(evt.target.value);
 //           });
 
                                      
});
