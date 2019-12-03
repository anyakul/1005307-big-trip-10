// Шаблон меню
export const createMenuTemplate = (menu) => {
  const {firstPoint, secondPoint} = menu;
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${firstPoint}</a>
      <a class="trip-tabs__btn" href="#">${secondPoint}</a>
    </nav>`
  );
};
