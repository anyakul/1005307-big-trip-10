import AbstractComponent from './abstract-component';
import {createButtonTemplate} from '../templates/add-event-button';

class AddEventButtonComponent extends AbstractComponent {
  getTemplate() {
    return createButtonTemplate();
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}

export default AddEventButtonComponent;
