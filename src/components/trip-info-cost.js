import AbstractComponent from './abstract';
import {createTripInfoCostTemplate} from './templates/trip-info-cost';

class TripCostComponent extends AbstractComponent {
  constructor(value) {
    super();

    this._value = value;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._value);
  }

  update(value) {
    this._value = value;
    this.getElement().querySelector(`.trip-info__cost-value`).textContent = value;
  }
}

export default TripCostComponent;
