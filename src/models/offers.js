class Offers {
  constructor() {
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers
      .map(({type, offers}) => ({type, offers, isChecked: false}));
  }

  getOffersByType(type) {
    const {offers = []} = this._offers
      .find((it) => it.type === type);

    return offers;
  }
}

export default Offers;
