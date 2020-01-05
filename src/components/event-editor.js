import AbstractComponent from './abstract-component';
import {createEventEditorTemplate} from './templates/event-editor';
import {showData} from './event-card';

class EventEditorComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._card = showData(events);
    this._submitHandler = [];
  }

  getTemplate() {
    return createEventEditorTemplate(this._card);
  }

  rerender() {
    super.rerender();
  }

  setSubmitHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-checkbox`).addEventListener(`click`, handler);
    this._favoriteButtonHanlder = handler;
  }

  setRollUpButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._rollUpButtonClickHandler = handler;
    this._submitHandler = handler;
  }
}

export default EventEditorComponent;
