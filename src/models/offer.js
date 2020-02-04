const normalizeOffer = ({title, price}) =>
  ({title, price, isChecked: false});

class Offer {
  constructor(offer) {
    this.type = offer[`type`];
    this.offers = offer[`offers`].map(normalizeOffer);
  }

  static parseOffer(offer) {
    return new Offer(offer);
  }

  static parseOffers(offer) {
    return offer.map(Offer.parseOffer);
  }
}

export default Offer;
