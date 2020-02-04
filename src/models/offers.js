class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getOffersByType(type) {
    const {offers = []} = this._offers
      .find((it) => it.type === type);

    return offers;
  }
}

export default Offers;
