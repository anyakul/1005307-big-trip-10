import AbstractComponent from './abstract-component';
import {createEventEditorTemplate} from './templates/event-editor';

export default class EventEditorComponent extends AbstractComponent {
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
