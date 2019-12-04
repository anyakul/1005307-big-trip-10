// Шаблон маршрута поездки
export const createTripInfoTemplate = (card) => {
  const {city, day, month} = card;
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${city} &mdash; ... &mdash; ${city}</h1>
        <p class="trip-info__dates">${day} ${month}&nbsp;&mdash;&nbsp;${day}</p>
     </div>`
  );
};
