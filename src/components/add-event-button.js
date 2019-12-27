import AbstractComponent from './abstract-component';

const createButtonTemplate = () => (
  `<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>`
);

class AddEventButtonComponent extends AbstractComponent {
  getTemplate() {
    return createButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export default AddEventButtonComponent;
