import AbstractComponent from './abstract-component';
import {createAddEventButtonTemplate} from './templates/add-event-button-template';

class AddEventButtonComponent extends AbstractComponent {
  getTemplate() {
    return createAddEventButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export default AddEventButtonComponent;
