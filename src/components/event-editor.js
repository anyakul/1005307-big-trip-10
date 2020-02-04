import AbstractSmartComponent from './abstract-smart';
import {createEventEditorEditTemplate} from './templates/event-editor-edit';
import {createEventEditorAddTemplate} from './templates/event-editor-add';
import {createFlatpickr} from '../utils/flatpickr';

const Mode = {
  ADD: `add`,
  EDIT: `edit`,
  VIEW: `view`,
};

const ActionType = {
  CREATE: `CREATE`,
  UPDATE: `UPDATE`,
  DELETE: `DELETE`,
  CANCEL: `CANCEL`,
  ADD_TO_FAVORITE: `ADD_TO_FAVORITE`,
};

const normalizeOffers = ({title, price}) =>
  ({title, price, isChecked: true});

class EventEditorComponent extends AbstractSmartComponent {
  constructor(eventItem, destinationsModel, offersModel, mode = Mode.EDIT) {
    super();

    this._event = eventItem;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._mode = mode;

    this._onSave = null;
    this._onDelete = null;
    this._onCancel = null;
    this._onFavoriteChange = null;
    this._onRollupButtonClick = null;

    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;

    this._applyFlatpickr();
  }

  getTemplate() {
    const {destination} = this._event;

    const template = this._mode === Mode.ADD
      ? createEventEditorAddTemplate
      : createEventEditorEditTemplate;

    return template(this._event,
        this._getOffers(),
        this._destinationsModel.getDestinationByName(destination.name),
        this._destinationsModel.getAll()
    );
  }

  _recoveryListeners() {
    this._subscribeOnEvents();

    this.setOnSave(this._onSave);
    this.setOnCancel(this._onCancel);
    this.setOnDelete(this._onDelete);
    this.setOnFavoriteChange(this._onFavoriteChange);
    this.setOnRollupButtonClick(this._onRollupButtonClick);
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  setOnSave(handler) {
    this._onSave = handler;

    if (this._mode === Mode.ADD) {
      this.getElement().addEventListener(`submit`, handler);
    } else {
      this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
    }
  }

  setOnDelete(handler) {
    this._onDelete = handler;

    if (this._mode === Mode.EDIT) {
      this.getElement().addEventListener(`reset`, handler);
    }
  }

  setOnCancel(handler) {
    this._onCancel = handler;

    if (this._mode === Mode.ADD) {
      this.getElement().addEventListener(`reset`, handler);
    }
  }

  setOnFavoriteChange(handler) {
    this._onFavoriteChange = handler;

    if (this._mode === Mode.EDIT) {
      this.getElement().querySelector(`.event__favorite-checkbox`)
        .addEventListener(`change`, this._onFavoriteChange);
    }
  }

  setOnRollupButtonClick(handler) {
    this._onRollupButtonClick = handler;

    if (this._mode === Mode.EDIT) {
      this.getElement().querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, this._onRollupButtonClick);
    }
  }

  removeElement() {
    this._removeFlatpickr();

    super.removeElement();
  }

  setState(state) {
    const element = this.getElement();
    const {saveButtonText, deleteButtonText} = state;

    if (saveButtonText) {
      element.querySelector(`.event__save-btn`).textContent = saveButtonText;
    }
    if (deleteButtonText) {
      element.querySelector(`.event__reset-btn`).textContent = deleteButtonText;
    }
  }

  getData() {
    const form = this._mode === Mode.ADD
      ? this.getElement()
      : this.getElement().querySelector(`form`);

    const checkedOffers = this.getElement()
      .querySelectorAll(`.event__offer-checkbox:checked`);

    const formData = new FormData(form);

    const destination = this._destinationsModel
      .getDestinationByName(formData.get(`event-destination`));

    const offers = Array.from(checkedOffers)
      .map(({name, value}) => ({title: name, price: +value}));

    return {
      'id': this._event.id,
      'type': formData.get(`event-type`),
      'base_price': +formData.get(`event-price`),
      'date_from': formData.get(`event-start-time`),
      'date_to': formData.get(`event-end-time`),
      'is_favorite': formData.has(`event-favorite`),
      destination,
      offers,
    };
  }

  _getOffers() {
    const {type, offers} = this._event;

    const availableOffers = this._offersModel.getOffersByType(type);
    const checkedOffers = offers.map(normalizeOffers);

    availableOffers.forEach((offer) => {
      const found = checkedOffers.some((it) => it.title === offer.title);
      if (!found) {
        checkedOffers.push(offer);
      }
    });

    return checkedOffers;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`).
      addEventListener(`change`, (evt) => {
        this._event = Object.assign({}, this._event, {
          type: evt.target.value,
          offers: [],
        });

        this.rerender();
      });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._event.destination = Object.assign({}, this._event.destination, {
          name: evt.target.value.trim(),
        });

        this.rerender();
      });
  }

  _applyFlatpickr() {
    const {startDate, endDate} = this._event;

    const element = this.getElement();

    const startDateInput = element.querySelector(`input[name=event-start-time]`);
    const endDateInput = element.querySelector(`input[name=event-end-time]`);

    this._flatpickrStartDate = createFlatpickr(startDateInput, {
      defaultDate: startDate.toISOString(),
      onClose: ([startDate]) => {
        this._flatpickrEndDate.set(`minDate`, startDate);
      },
    });

    this._flatpickrEndDate = createFlatpickr(endDateInput, {
      defaultDate: endDate.toISOString(),
      onClose: ([date]) => {
        this._flatpickrStartDate.set(`maxDate`, date);
      },
    });

    this._flatpickrEndDate.set(`minDate`, startDate);
    this._flatpickrStartDate.set(`maxDate`, endDate);
  }

  _removeFlatpickr() {
    if (this._flatpickrStartDate !== null) {
      this._flatpickrStartDate.destroy();
      this._flatpickrStartDate = null;
    }

    if (this._flatpickrEndDate !== null) {
      this._flatpickrEndDate.destroy();
      this._flatpickrEndDate = null;
    }
  }
}

export default EventEditorComponent;
export {Mode, ActionType};
