// Шаблон карточки события
const generateExtraServicesMarkup = (options) => {
  return Array.from(options)
    .map((extraOption) => {
      const {type, name, price} = extraOption;

      return (
        `<li class="event__offer">
          <span class="event__offer-title">${type} ${name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${price}</span>
         </li>`
      );
    })
    .join(`\n`);
};

export const createCardTemplate = (card) => {
  const {type, city, price, dateStart, dateFinish, timeStart, timeFinish, diffTime, extraServices} = card;
  let services = generateExtraServicesMarkup(extraServices);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} to ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}">${timeStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateFinish}">${timeFinish}</time>
          </p>
          <p class="event__duration">${diffTime}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${services}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};