import {getDays} from '../trip-day';

const createTripDayTemplate = (day, events, count) => {
  if (!day && !events && !count) {
    return `<li class="trip-days__item day">
        <div class="day__info"></div>
        <ul class="trip-events__list"></ul>
      </li>`;
  }

  const days = getDays(day);
  const isEmpty = events.length === 0;

  return (isEmpty ? `` :
    `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${count + 1}</span>
        <time class="day__date" datetime=${days.datetime}>${days.tripDay}</time>
      </div>
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export {createTripDayTemplate};
