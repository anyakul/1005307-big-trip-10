class Offers {
  constructor() {
    this.offers = [];
  }

  setOffers(offers) {
    this.offers = offers;
  }

  getOffersByType(type) {
    const {offers = []} = this.offers
      .find((it) => it.type === type);

    return offers;
  }
}

export default Offers;
