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

  setRollUpButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._rollUpButtonClickHandler = handler;
  }

  recoveryListeners() {
    this.setRollUpButtonClickHandler(this._rollUpButtonClickHandler);
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`change`, () => {
        this._events.isFavorite = !this._events.isFavorite;
        this.rerender();
      });

    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._events.type = evt.target.value;
        this.rerender();
      }
    });
  }
}

export default EventEditorComponent;
