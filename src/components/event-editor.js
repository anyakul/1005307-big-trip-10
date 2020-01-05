import AbstractSmartComponent from './abstract-smart-component';
import {createEventEditorTemplate} from './templates/event-editor';
import {showData} from './event-card';

class EventEditorComponent extends AbstractSmartComponent {
  constructor(events) {
    super();
    this._card = showData(events);
  }

  getTemplate() {
    return createEventEditorTemplate(this._card);
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, handler);
    this._favoriteButtonHanlder = handler;
  }

  setRollUpButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._rollUpButtonClickHandler = handler;
  }

  recoveryListeners() {
    
  }
}

export default EventEditorComponent;
