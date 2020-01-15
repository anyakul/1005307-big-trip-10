import {formatMonthDay, formatDate} from './date';

const createDayBoardTemplates = (tripDays) => {
  return (tripDays.map((day, i) => {
    const dayDate = day[0].dateFrom;
    const monthDay = formatMonthDay(dayDate);
    const date = formatDate(dayDate);

    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${i + 1}</span>
          <time class="day__date" datetime="${date}">${monthDay}</time>
        </div>
        <ul class="trip-events__list" data-date="${date}"></ul>
      </li>`
    );
  }).join(`\n`));
};

export {createDayBoardTemplates};
