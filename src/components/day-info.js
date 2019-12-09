// Информация о дне поездки
import {showDate} from '../utils';

export const createDayInfoTemplate = (card) => {

  const {dateFromUnix} = card;
  const date = showDate(dateFromUnix);

  return (
    `<div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">${date}</time>
    </div>`
  );
};
