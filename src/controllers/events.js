import {render, replace, remove, RenderPosition} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import EventCardComponent from '../components/event-card';
import EventEditorComponent from '../components/event-editor';
import EventsModel from '../models/events';

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

  constructor(container, onDataChange, onViewChange) {
    this._eventItem = null;
    this._mode = Mode.VIEW;
    this._container = container;
    this._eventComponent = null;
    this._eventEditorComponent = null;
    this._onViewChange = onViewChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChange = onDataChange;
  }

  render(id, eventItem, destinations, availableOffers, mode) {
    if (mode === Mode.ADD) {
      const eventIt = getDefaultEvent();
      this._addEventComponent = new EventEditorComponent(eventIt, destinations, availableOffers, Mode.ADD);
      this._setAddCardListeners();
      render(this._container, this._addEventComponent.getElement(), RenderPosition.AFTERBEGIN);
    } else {
      this._eventItem = eventItem;
      const oldEventComponent = this._eventComponent;
      const oldEditEventComponent = this._eventEditorComponent;

      this._eventComponent = new EventCardComponent(this._eventItem);
      this._eventEditorComponent = new EventEditorComponent(this._eventItem, destinations, availableOffers, Mode.EDIT);

      this._setCardListeners();

      if (oldEventComponent && oldEditEventComponent) {
        replace(this._eventComponent, oldEventComponent);
        replace(this._eventEditorComponent, oldEditEventComponent);
      } else {
        render(this._container, this._eventComponent.getElement());
      }
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
//  this.rerender();
  _closeForm() {
    remove(this._addEventComponent);
  }

  //this._setListeners();
 
 _setEditCardListeners() {
  
    this._eventEditorComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditorComponent.getFormData();
      const formData = parseFormData(data);
      console.log(data);
      console.log(formData);
      this._onDataChange(this, this._eventItem, formData);
      this._showCard();
    });
    this._eventEditorComponent.setRollupButtonClickHandler(() => {
      this._eventEditorComponent.reset();
      this._showCard();
    })
  }

  destroy() { console.log('remove',this._eventEditorComponent,this._eventComponent);
    remove(this._eventEditorComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
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
