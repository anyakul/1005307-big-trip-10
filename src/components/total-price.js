import {createElement} from '../utils';

// Информация о стоимости
const createTotalPriceTemplate = (card) => {
  const {basePrice} = card;
  let totalPrice = basePrice;
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>`
  );
};

export default class totalPriceComponent {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createTotalPriceTemplate(this._card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

