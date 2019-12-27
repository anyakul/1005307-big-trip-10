import AbstractComponent from './abstract-component';

const createTripCostTemplate = (events) => {
  const {tripCost} = events;
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
  </p>`;
};

const getTotalCost = (events) => events
  .reduce((total, {basePrice}) => total + basePrice, 0);

const showTripCost = (card) => {
  return {
    tripCost: getTotalCost(card)
  };
};

class TripCostComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
    if (events) {
      this._tripCost = showTripCost(this._events);
    }
  }

  getTemplate() {
    return createTripCostTemplate(this._tripCost);
  }
}

export default TripCostComponent;
