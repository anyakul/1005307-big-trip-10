// Меню
import AbstractComponent from './abstract-component.js';

const createSiteMenuTemplate = (menu) => {
  const {firstPoint, secondPoint} = menu;

  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${firstPoint}</a>
      <a class="trip-tabs__btn" href="#">${secondPoint}</a>
    </nav>`
  );
};

export default class SiteMenuComponent extends AbstractComponent {
  constructor(menu) {
    super();

    this._menu = menu;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._menu);
  }
}
