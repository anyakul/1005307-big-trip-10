const createTripCostTemplate = (tripCost) => (
  `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
  </p>`
);

export {createTripCostTemplate};
