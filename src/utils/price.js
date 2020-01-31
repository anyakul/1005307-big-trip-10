const calcOffersPrice = (offers) => offers
  .reduce((total, {price}) => total + price, 0);

export const calcTotalPrice = (events) => events
  .reduce((total, {price, offers}) => {
    if (offers.length > 0) {
      price += calcOffersPrice(offers);
    }

    return total + price;
  }, 0);
