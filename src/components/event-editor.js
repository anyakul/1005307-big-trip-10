import AbstractSmartComponent from './abstract-smart';
import {createEventEditorTemplate} from './templates/event-editor';

class EventEditorComponent extends AbstractSmartComponent {
  constructor(events, destinations, offers, mode) {
    super();
    this._events = events;
    this._destinations = destinations;
    this._mode = mode;
    this._offers = offers;
    this._availableOffers = this._offers.getOffersByType(this._events.type);
    this._rollUpButtonClickHandler = null;
    this._submitHandler = null;
    this._favoriteButtonHandler = null;
    this._subscribeOnEvents(mode);
  }

  getTemplate() {
    return createEventEditorTemplate(this._events, this._destinations, this._availableOffers, this._mode);
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
  //  this._subscribeOnEvents();
  }

  _subscribeOnEvents() {
    /* if (mode !== Mode.ADD) {
      this.getElement().querySelector(`.event__favorite-checkbox`)
        .addEventListener(`change`, () => {
          this._events.isFavorite = !this._events.isFavorite;
          this.rerender();
        });
    } else {
      return;
    }*/
    this.getElement().querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._events.type = evt.target.value;
        this.rerender();
      }
    });
  }
}

export default EventEditorComponent;
