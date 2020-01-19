import AbstractComponent from './abstract';
import {createTripInfoCostTemplate} from './templates/trip-info-cost';

class TripCostComponent extends AbstractComponent {
  constructor(cost) {
    super();
    this._cost = cost;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._cost);
  }
}

export default TripCostComponent;
