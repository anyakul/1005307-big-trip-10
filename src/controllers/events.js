import {render, replace, remove, RenderPosition} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import EventCardComponent from '../components/event-card';
import EventEditorComponent from '../components/event-editor';
// import EventsModel from '../models/events';

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
/*
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
*/
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
    if (mode === Mode.ADD) {
      const eventIt = getDefaultEvent();
      this._addEventComponent = new EventEditorComponent(eventIt, Mode.ADD);
      this._setAddCardListeners();
      render(this._container, this._addEventComponent.getElement(), RenderPosition.AFTERBEGIN);
    } else {
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

  _setListeners() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _setAddCardListeners() {
    this._addEventComponent.setCancelHandler((evt) => {
      evt.preventDefault();
      this._closeForm();
    });

    this._addEventComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._closeForm();
    });
  }

  _closeForm() {
    remove(this._addEventComponent);
  }

  _setEditCardListeners() {
    this._setListeners();
    this._eventEditorComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._showCard();
    });
    this._eventEditorComponent.setRollUpButtonClickHandler(() => {
      return this._showCard();
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
