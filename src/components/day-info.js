// Информация о дне поездки

export const createDaysInfoTemplate = (card) => {

  const {day, month} = card;

  return (
    `<div class="day__info">
      <span class="day__counter">1</span>
      <time class="day__date" datetime="2019-03-18">${day} ${month}</time>
    </div>`
  );
};
