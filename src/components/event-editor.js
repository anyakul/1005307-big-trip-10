import AbstractSmartComponent from './abstract-smart';
import {createEventEditorTemplate} from './templates/event-editor';
import {Mode} from './events';
import flatpickr from 'flatpickr';
import {formatFullDate, formatDuration} from './templates/date';

class EventEditorComponent extends AbstractSmartComponent {
  constructor(events, destinations, offers, mode) {
    super();
    this._events = events;
    this._destinations = destinations;
    this._offers = offers;
    this._availableOffers = this._offers.getOffersByType(this._events.type);
    this._eventForReset = Object.assign({}, event);

    this._mode = mode;
    this._details = mode === Mode.EDIT;

    this._submitHandler = null;
    this._deleteHandler = null;
    this._flatpickr = null;

    this._applyFlatpickr();
    this._subscribeOnEvents();
    this._eventForReset = Object.assign({}, event);
  }

  getTemplate() {
    return createEventEditorTemplate(this._events, this._destinations, this._availableOffers, this._mode, this._details);
  }

  setOnSubmit(handler) {
    this._submitHandler = handler; 
    if (this._mode === Mode.ADD) {
      this.getElement().addEventListener(`submit`, this._submitHandler); console.log('handler=',this._submitHandler);
    } else {
      this.getElement().querySelector(`form`).addEventListener(`submit`, this._submitHandler);
    }
  }

  setOnCancel(handler) {
    this.getElement().addEventListener(`reset`, handler);
    this._cancelHandler = handler;
  }

  setOnRollupButtonClick(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
    this._rollUpButtonClickHandler = handler;
  }

  recoveryListeners() {
    if (this._mode !== Mode.ADD) {
      this.setOnRollupButtonClick(this._rollupButtonClickHandler);
    }
    this._subscribeOnEvents(this._mode);
    this._setValidation();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this.rerender();
  }

  _setValidation() {
    const startDateInput = this._element.querySelector(`input[name=event-start-time]`);

    if (formatDuration(this._events.startDate, this._events.endDate) > 0) {
      startDateInput.setCustomValidity(`The start time should be earlier than the end time`);
    } else {
      startDateInput.setCustomValidity(``);
    }
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    if (this._mode === Mode.EDIT) {
      element.querySelector(`.event__favorite-checkbox`).addEventListener(`change`, () => {
        this._events = Object.assign({}, this._events, {isFavorite: !this._events.isFavorite});
      });
    }

    element.querySelector(`.event__type-list`).addEventListener(`change`, (evt) => {
      this._availableOffers = this._offers.getOffersByType(evt.target.value);
      this._events = Object.assign({}, this._events,
          {type: evt.target.value},
          {offers: []});

      this.rerender();
    });

    element.querySelector(`.event__input--destination`).addEventListener(`change`, (evt) => {
      const inputValue = evt.target.value.trim();
      const isValidDestination = this._destinations.getAll().findIndex((it) => it.name === inputValue) === -1;
      if (isValidDestination) {
        this._events.destination.name = ``;
        this._details = false;
      } else {
        this._events.destination = Object.assign({}, this._events.destination, {name: evt.target.value.trim()});
        this._details = true;
      }
      this.rerender();
    });

    element.querySelector(`input[name=event-start-time]`).addEventListener(`change`, (evt) => {
      this._events.startDate = formatFullDate(evt.target.value);
      this._setValidation();
    });

    element.querySelector(`input[name=event-end-time]`).addEventListener(`change`, (evt) => {
      this._events.endDate = formatFullDate(evt.target.value);
      this._setValidation();
    });

    element.querySelector(`.event__input--price`).addEventListener(`change`, (evt) => {
      this._events.price = +evt.target.value;
    });
  }

  getFormData() {
    const form = this._mode === Mode.ADD ? this.getElement() : this.getElement().querySelector(`form`);
    const formData = new FormData(form);

    return {
      id: this._events.id,
      type: this._events.type,
      startDate: formData.get(`event-start-time`),
      endDate: formData.get(`event-end-time`),
      destination: Object.assign({}, this._destinations.getDestinationByName(formData.get(`event-destination`))),
      price: formData.get(`event-price`),
      offers: this._events.offers,
      isFavorite: this._events.isFavorite
    };
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      Object.values(this._flatpickr).forEach((it) => it.destroy());
      this._flatpickr = null;
    }

    const [startDateInput, endDateInput] = Array.from(this.getElement().querySelectorAll(`.event__input--time`));

    this._flatpickr = Object.assign({}, {START: {}, END: {}});

    this._flatpickr.START = flatpickr(startDateInput, {
      enableTime: true,
      allowInput: true,
      defaultDate: this._events.startDate,
      formatDate: formatFullDate
    });

    this._flatpickr.END = flatpickr(endDateInput, {
      enableTime: true,
      allowInput: true,
      defaultDate: this._events.endDate,
      formatDate: formatFullDate
    });
  }
}

export default EventEditorComponent;
