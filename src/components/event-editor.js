import AbstractSmartComponent from './abstract-smart';
import {createEventEditorTemplate} from './templates/event-editor';
import {Mode} from './events';

class EventEditorComponent extends AbstractSmartComponent {
  constructor(events, mode) {
    super();
    this._events = events;
    this._mode = mode;
    this._rollUpButtonClickHandler = null;
    this._submitHandler = null;
    this._favoriteButtonHandler = null;
    this._subscribeOnEvents(mode);
  }

  getTemplate() {
    return createEventEditorTemplate(this._events, this._mode);
  }

  setSubmitHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setCancelHandler(handler) {
    this.getElement().addEventListener(`reset`, handler);
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

  _subscribeOnEvents(mode) {
    if (mode !== Mode.ADD) {
      this.getElement().querySelector(`.event__favorite-checkbox`)
        .addEventListener(`change`, () => {
          this._events.isFavorite = !this._events.isFavorite;
          this.rerender();
        });
    } else {
      return;
    }
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._events.type = evt.target.value;
        this.rerender();
      }
    });
  }
}

export default EventEditorComponent;
