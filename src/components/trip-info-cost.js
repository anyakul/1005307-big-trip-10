import AbstractComponent from './abstract';
import {createTripInfoCostTemplate} from './templates/trip-info-cost';
import {calcTotalPrice} from '../utils/price';

class TripCostComponent extends AbstractComponent {
  constructor() {
    super();

    this._value = 0;
  }

  getTemplate() {
    return createTripInfoCostTemplate(this._value);
  }

  update(events) {
    this._value = calcTotalPrice(events);
    this.getElement()
      .querySelector(`.trip-info__cost-value`).textContent = this._value;
  }
}

export default TripCostComponent;
