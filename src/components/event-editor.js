import AbstractSmartComponent from './abstract-smart';
import {createEventEditorTemplate} from './templates/event-editor';
import {Mode} from './events';

class EventEditorComponent extends AbstractSmartComponent {
  constructor(events, destinations, offers, mode) {
    super();
    this._events = events;
    this._destinations = destinations;
    this._mode = mode;
    this._offers = offers;
    this._availableOffers = this._offers.getOffersByType(this._events.type);
    this._event = null;
    this._rollUpButtonClickHandler = null;
    this._submitHandler = null;
    this._favoriteButtonHandler = null;
    this._cancelHandler = null;
    this._startTimeHandler = null;
    this._endTimeHandler = null;
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
    this._cancelHandler = handler;
  }

  setRollupButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._rollUpButtonClickHandler = handler;
  }

  recoveryListeners() {
    if (this._mode !== Mode.ADD) {
      this.setRollupButtonClickHandler(this._rollupButtonClickHandler);
    }
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents(this._mode);
  }

  _subscribeOnEvents() {
    const element = this.getElement();
    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      const inputValue = evt.target.value.trim();
      const isValidDestination = this._destinations.getAll().findIndex((it) => it.name === inputValue) === -1;
      if (isValidDestination) {
        this._event.destination.name = ``;
        this._details = false;
      } else {
        this._events.destination = Object.assign({}, this._events.destination, {name: evt.target.value.trim()});
        this._details = true;
      }
      this.rerender();
    });

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._availableOffers = this._offers.getOffersByType(evt.target.value);
      this._event = Object.assign({}, this._event,
          {type: evt.target.value},
          {offers: []});

      this.rerender();
    });
  }
}

export default EventEditorComponent;
