import AbstractComponent from './abstract-component';

const createTripCostTemplate = (tripCost) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
  </p>`
);

class TripCostComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
    this._tripCost = this._calc();
  }

  _sumOffers(offerList) {
    return offerList.reduce((total, current) => total + current.accepted * current.price, 0);
  }

  _calc() {
    return this._events.reduce((total, current) => total + current.basePrice + this._sumOffers(current.offers), 0);
  }

  getTemplate() {
    return createTripCostTemplate(this._tripCost);
  }
}

export default TripCostComponent;
