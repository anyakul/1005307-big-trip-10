import {showTime, showFullDate} from '../utils/date';
import {createEventCardTemplate} from './templates/event-card';
import AbstractComponent from './abstract-component';

const showDateInCard = (card) => {
  const diffTimeUnix = card.dateToUnix - card.dateFromUnix;
  return {
    timeFrom: showTime(card.dateFromUnix),
    timeTo: showTime(card.dateToUnix),
    diffTime: showTime(diffTimeUnix),
    fullDateFrom: showFullDate(card.dateFromUnix),
    fullDateTo: showFullDate(card.dateToUnix),
  };
};

const createOffers = (offers) => Object.values(offers)
  .map((offer) => ({
    title: offer.title,
    price: offer.price,
    accepted: offer.accepted,
  }));

const showData = (card) => {
  const {type, destination, basePrice} = card;
  return {
    type: `${type}`,
    destination: `${destination.name}`,
    time: showDateInCard(card),
    basePrice: `${basePrice}`,
    offers: createOffers(card.offers),
  };
};

class EventCardComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._card = showData(events);
  }

  getTemplate() {
    return createEventCardTemplate(this._card);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}

export default EventCardComponent;
