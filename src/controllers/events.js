import {render, replace} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import EventCardComponent from '../components/event-card';
import EventEditorComponent from '../components/event-editor';
import EventsModel from '../models/events';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADD: `add`,
};

const getDefaultEvent = (newEventId) => {
  return ({
    id: newEventId,
    type: `sightseeing`,
    startDate: new Date(),
    endDate: new Date(),
    destination: {
      name: ``,
      description: ``,
      offers: []
    },
    price: 0,
    offers: [],
    isFavorite: false
  });
};

const parseFormData = (formData) => {
  return new EventsModel({
    'id': formData.id,
    'type': formData.type,
    'date_from': formData.startDate,
    'date_to': formData.endDate,
    'destination': formData.destination,
    'base_price': formData.price,
    'offers': formData.offers,
    'is_favorite': formData.isFavorite
  });
};

class EventsController {

  constructor(container, onViewChange) {
    this._eventItem = null;
    this._mode = Mode.VIEW;
    this._container = container;
    this._eventComponent = null;
    this._editEventComponent = null;
    // this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    // this._eventItem = eventItem;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(id, eventItem, mode) {
    if (mode === Mode.add) {
      const eventItem = getDefaultEvent();
      const addEventComponent = new EventEditorComponent(eventItem, Mode.Add);
      render(this._container, addEventComponent.getElement());
    }
    else {
      this._eventItem = eventItem;
      this._mode = mode;
      this._eventComponent = new EventCardComponent(this._eventItem);
      this._eventEditorComponent = new EventEditorComponent(this._eventItem, Mode.EDIT);
      this._setCardListeners();
      render(this._container, this._eventComponent.getElement());
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._showCard();
    }
  }

  _setCardListeners() {
    this._eventComponent.setRollUpButtonClickHandler(() => this._showForm());
  }

  _setEditCardListeners() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditorComponent.setRollUpButtonClickHandler(() => {
      return this._showCard();
    });
    this._eventEditorComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._showCard();
    });
  }

  _showCard() {
    replace(this._eventComponent, this._eventEditorComponent);
    this._mode = Mode.DEFAULT;
  }

  _showForm() {
    this._onViewChange();
    replace(this._eventEditorComponent, this._eventComponent);
    this._mode = Mode.EDIT;
    this._setEditCardListeners();
  }

  _onEscKeyDown(evt) {
    if (isEscKey(evt)) {
      this._showCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default EventsController;
