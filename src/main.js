import 'flatpickr/dist/flatpickr.min.css';
import {render} from './utils/render';
import TripController from './controllers/trip';
import TripInfoController from './controllers/trip-info';
import FilterController from './controllers/filter';
import SiteMenuComponent from './components/site-menu';
import EventsModel from './models/events';
import DestinationsModel from './models/destinations';
import OffersModel from './models/offers';
import StatsController from './controllers/stats';
import API from './api';
import SiteMenu from './components/site-menu';
import AddEventButtonComponent from './components/add-event-button';

const MenuTab = {
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

const header = document.querySelector(`header`);
const tripMain = header.querySelector(`.trip-main`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const tripInfo = tripMain.querySelector(`.trip-info`);

const main = document.querySelector(`main`);
const pageBodyContainer = main.querySelector(`.page-body__container`);
const tripEvents = pageBodyContainer.querySelector(`.trip-events`);    

const tripController = new TripController(tripEvents, eventsModel, destinationsModel, offersModel, api);

const statsController = new StatsController(pageBodyContainer, eventsModel);

const filterController = new FilterController(tripControls, eventsModel);        // console.log(tripControls, this._eventsModel);
const addEventButtonComponent = new AddEventButtonComponent();
render(tripMain, addEventButtonComponent.getElement());
const tripInfoController = new TripInfoController(tripInfo, eventsModel);
const siteMenuComponent = new SiteMenu();
render(tripControls, siteMenuComponent.getElement());

Promise.all([api.getPoints(), api.getDestinations(), api.getOffers()]).then(([points, destinations, offers]) => {
  eventsModel.setEvents(points);
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);
  
  siteMenuComponent.setTabChangeHandler((evt) => {
    if (evt.target.value === MenuTab.TABLE) {
      tripController.show();
      statsController.hide();
    } 
    else {
      statsController.show();
      tripController.hide();
    }
  });
  tripInfoController.render();
  filterController.render();
  statsController.render();
  tripController.render();
  statsController.hide();

  console.log(points);
 // setMenuControllers.setMenuChangeHandler(tripController, statsController);
  
  
   
 //         this.getElement().addEventListener(`change`, (evt) => {                 //  console.log( handler(evt.target.value));
 //          tripController.render();                                                                //  return   handler(evt.target.value);                            
                                                                           //   console.log(evt.target.value);
 //           });
 
                                      
});
