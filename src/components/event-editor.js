import AbstractComponent from './abstract-component';
import {createEventEditorTemplate} from './templates/event-editor';

class EventEditorComponent extends AbstractComponent {
  getTemplate() {
    return createEventEditorTemplate();
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }
}

export default EventEditorComponent;
