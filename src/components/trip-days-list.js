import AbstractComponent from './abstract';
import {createTripDaysListComponent} from './templates/trip-days-list';

class TripDaysListComponent extends AbstractComponent {
  getTemplate() {
    return createTripDaysListComponent();
  }
}

export default TripDaysListComponent;
