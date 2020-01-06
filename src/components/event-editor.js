import AbstractSmartComponent from './abstract-smart-component';
import {createEventEditorTemplate} from '../templates/event-editor';

class EventEditorComponent extends AbstractSmartComponent {
  constructor(events) {
    super();
    this._events = events;
    this._subscribeOnEvents();
    this._rollUpButtonClickHandler = null;
    this._submitHandler = null;
    this._favoriteButtonHandler = null;
  }

  getTemplate() {
    return createEventEditorTemplate(this._events);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, handler);
    this._favoriteButtonHandler = handler;
  }

  setRollUpButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._rollUpButtonClickHandler = handler;
  }

  recoveryListeners() {
    this.setRollUpButtonClickHandler(this._rollUpButtonClickHandler);
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteButtonClickHandler(this._favoriteButtonHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._card.type = evt.target.value;
        this.rerender();
      }
    });
  }
}

export default EventEditorComponent;
