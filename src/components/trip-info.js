// Шаблон маршрута поездки
export const createTripInfoTemplate = (card) => {
  const {city, date} = card;
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${city} &mdash; ... &mdash; ${city}</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
     </div>`
  );
};
