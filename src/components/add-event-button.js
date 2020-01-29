import AbstractComponent from './abstract';
import {createAddEventButtonTemplate} from './templates/add-event-button';

class AddEventButtonComponent extends AbstractComponent {
  getTemplate() {
    return createAddEventButtonTemplate();
  }

  setOnClick(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setDisabled(value) {
    this._element.disabled = value;
  }
}

export default AddEventButtonComponent;
