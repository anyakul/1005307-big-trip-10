import AbstractComponent from './abstract-component';
import {createEventEditorTemplate} from './templates/event-editor';
import {showData} from './event-card';

class EventEditorComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._card = showData(events);
  }

  getTemplate() {
    return createEventEditorTemplate(this._card);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      handler();
    });
  }
}

export default EventEditorComponent;
