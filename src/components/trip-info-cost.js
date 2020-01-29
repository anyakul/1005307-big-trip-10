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

  update(amount) {
    this._cost = amount;
    this.getElement().querySelector(`.trip-info__cost-value`).innerHTML = this._cost;
  }
}

export default TripCostComponent;
