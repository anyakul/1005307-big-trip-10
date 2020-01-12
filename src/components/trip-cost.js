import AbstractComponent from './abstract-component';
import {createTripCostTemplate} from './templates/trip-cost';

class TripCostComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
    this._tripCost = 0;
  }
  /*
  _calc(events) {
    if (events.length === 0) {
      return 0;
    }

    const eventsPricesAmount = calculateSum(events.map((it) => it.basePrice));
    const options = events.map((eventItem) => eventItem.offers.map((offers) => offers.accepted * offers.price));
    const optionsAmount = calculateSum(options.map((arr) => calculateSum(arr)));
    this._tripCost = eventsPricesAmount + optionsAmount;
    return this._tripCost;
  }
  */

  _sumOffers(offerList) {
    return offerList.reduce((total, current) => total + current.accepted * current.price, 0);
  }

  _calc() {
    return this._events.reduce((total, current) => total + current.basePrice + this._sumOffers(current.offers), 0);
  }


  getTemplate() {
    return createTripCostTemplate(this._calc(this._events));
  }
}

export default TripCostComponent;
