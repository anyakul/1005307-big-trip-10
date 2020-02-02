class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers.map(({type, offers}) => ({type, offers}));
  }

  getOffersByType(type) {
    return this._offers.find((it) => it.type === type).offers;
  }
}

export default Offers;
