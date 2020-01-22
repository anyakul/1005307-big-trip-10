import {render, replace, remove, RenderPosition} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import EventCardComponent from '../components/event-card';
import EventEditorComponent from '../components/event-editor';

const Mode = {
  VIEW: `view`,
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

class EventsController {

  constructor(container, onViewChange) {
    this._eventItem = null;
    this._mode = Mode.VIEW;
    this._container = container;
    this._eventComponent = null;
    this._editEventComponent = null;
    this._onViewChange = onViewChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(eventItem, destinations, availableOffers, mode) {
    if (mode === Mode.ADD) {
      const eventIt = getDefaultEvent();
      this._addEventComponent = new EventEditorComponent(eventIt, destinations, availableOffers, Mode.ADD);
      this._setAddCardListeners();
      render(this._container, this._addEventComponent.getElement(), RenderPosition.AFTERBEGIN);
    } else {
      this._eventComponent = new EventCardComponent(eventItem);
      this._eventEditorComponent = new EventEditorComponent(eventItem, destinations, availableOffers, Mode.EDIT);

      render(this._container, this._eventComponent.getElement());
      this._setCardListeners();
    }
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._showCard();
    }
  }

  _setCardListeners() {
    this._eventComponent.setRollupButtonClickHandler(() => this._showForm());
  }

  _setListeners() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _eventListener(evt) {
    evt.preventDefault();
    this._closeForm();
  }

  _setAddCardListeners() {
    this._addEventComponent.setCancelHandler((evt) => {
      this._eventListener(evt);
    });

    this._addEventComponent.setSubmitHandler((evt) => {
      this._eventListener(evt);
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
    this._eventEditorComponent.setRollupButtonClickHandler(() => {
      this._showCard();
    });
  }

  _showCard() {
    replace(this._eventComponent, this._eventEditorComponent);
    this._mode = Mode.VIEW;
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
