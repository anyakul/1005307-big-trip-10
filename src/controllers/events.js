import {render, replace, remove, RenderPosition} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import EventCardComponent from '../components/event-card';
import EventEditorComponent from '../components/event-editor';
import Event from '../models/event';
import moment from 'moment';

const Mode = {
  VIEW: `view`,
  EDIT: `edit`,
  ADD: `add`,
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const getDefaultEvent = (id) => ({
  id,
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

const EmptyEvent = (id) => ({
  id,
  type: ``,
  startDate: new Date(),
  endDate: new Date(),
  destination: {
    name: ``,
    description: ``,
    offers: ``,
  },
  price: ``,
  offers: [],
  isFavorite: false
});

const parseFormData = (formData) => {
  return new Event({
    'id': formData.id,
    'type': formData.type,
    'date_from': new Date(
          moment(formData.startDate, `DD/MM/YY HH:mm`).valueOf()),
    'date_to': new Date(
          moment(formData.endDate, `DD/MM/YYYY HH:mm`).valueOf()),
    'destination': formData.destination,
    'base_price':  Number(formData.price),
    'offers': formData.offers,
    'is_favorite': formData.isFavorite
  });
};

class EventsController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.VIEW;

    this._eventItem = null;
    this._addEventComponent = null;
    this._eventComponent = null;
    this._eventEditorComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(id, eventItem, destinations, availableOffers, mode, addEventButtonComponent) {
    this._id = id;
    this._addEventButtonComponent = addEventButtonComponent;
    if (mode === Mode.ADD) {
      const eventIt = getDefaultEvent();                                
      this._eventEditorComponent = new EventEditorComponent(eventIt, destinations, availableOffers, Mode.ADD);
      render(this._container, this._eventEditorComponent.getElement(), RenderPosition.AFTERBEGIN);
      this._setAddCardListeners();
//      this._addEventComponent.applyFlatpickr();
    return;      
    } else {
      this._eventItem = eventItem;                               
      const oldEventComponent = this._eventComponent;  
      const oldEditEventComponent = this._eventEditorComponent;

      this._eventComponent = new EventCardComponent(this._eventItem);
      this._eventEditorComponent = new EventEditorComponent(this._eventItem, destinations, availableOffers, Mode.EDIT);
                                              // console.log('render3', this._eventComponent );
      this._setCardListeners();
      this._eventEditorComponent.applyFlatpickr();

     if (oldEventComponent && oldEditEventComponent) {
        replace(this._eventComponent, oldEventComponent);
        replace(this._eventEditorComponent, oldEditEventComponent);  
      } else {
        render(this._container, this._eventComponent.getElement());    
      } 
    }
  }

  setDefaultView() {
    if (this._mode === Mode.ADD) {                                       //     console.log('this._addEventComponent=',this._addEventComponent);
      if (this._eventEditorComponent) {
        remove(this._eventEditorComponent);
      }
      this._showCard();
    }
  }

  _setCardListeners() {
    this._eventComponent.setOnRollupButtonClick(() => this._showForm());
  }

  _setEscListener() {
    document.addEventListener(`keydown`, this._onEscKeyDown);   
  }

  _setAddCardListeners() {
    this._mode = Mode.ADD;
    this._setEscListener()
    this._eventEditorComponent.setOnCancel((evt) => {
      this._onDataChange(this, EmptyEvent, null);
      this._addEventButtonComponent.setDisabled(false);
      this.destroy();
    });

    this._eventEditorComponent.setOnSubmit((evt) => {
      evt.preventDefault();

      this._addEventButtonComponent.setDisabled(false);

      const data = this._eventEditorComponent.getFormData();
      const formData = parseFormData(data);

      this._onDataChange(this, EmptyEvent(this._id), formData);
    });
  }

  _setEditCardListeners() {
    this._mode = Mode.EDIT;
    this._setEscListener();
    
    this._eventEditorComponent.setOnSubmit((evt) => {
      evt.preventDefault();
       this._eventEditorComponent.setData({
        saveButtonText: 'Saving...',
      }); 
      const data = this._eventEditorComponent.getFormData(); 
      const formData = parseFormData(data);
      console.log('formData',formData,data/*,this._eventComponent*/);

      this._showCard();
      this._onDataChange(this, this._eventItem, formData);
    });

    this._eventEditorComponent.setOnRollupButtonClick(() => { 
      this._eventEditorComponent.reset();   
      this._showCard();
    });
    
    this._eventEditorComponent.setOnDelete((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._eventItem, null);
    });
  }

  destroy() {
    if (this._mode===Mode.ADD) {
      remove(this._eventEditorComponent);
      return;
    }
    remove(this._eventEditorComponent);
    if (this._eventComponent) {
      remove(this._eventComponent);
    }
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
    this._eventEditorComponent.applyFlatpickr();
  }

  shake() {
    this._eventEditorComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditorComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditorComponent.setData({
        saveButtonText: `Saving`,
        deleteButtonText: `Deleting`,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _onEscKeyDown(evt) {
    if (isEscKey(evt)) {   
      if (this._mode === Mode.ADD) {
        this._onDataChange(this, EmptyEvent, null);
        this._addEventButtonComponent.setDisabled(false);
      }
      else {
        this._showCard();
      }
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default EventsController;
export {EmptyEvent}
