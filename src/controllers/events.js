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

const SHAKE_ANIMATION_TIMEOUT = 600;

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

const EmptyEvent = (newEventId) => {
  return ({
    id: ``,
    type: ``,
    startDate: null,
    endDate: null,
    destination: {
      name: ``,
      description: ``,
      offers: ``,
    },
    price: ``,
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

  render(id, eventItem, destinations, availableOffers, mode, addEventButtonComponent) { //console.log('render',/*id,eventItem,*/destinations,mode,addEventButtonComponent);
    this._addEventButtonComponent = addEventButtonComponent;
    if (mode === Mode.ADD) {
      const eventIt = getDefaultEvent();                                //    console.log('render', eventIt );
      this._eventEditorComponent = new EventEditorComponent(eventIt, destinations, availableOffers, Mode.ADD);
      
      render(this._container, this._eventEditorComponent.getElement(), RenderPosition.AFTERBEGIN); 
      this._setAddCardListeners();                       // console.log('this._addEventComponent', this._addEventComponent );
    } else {
      this._eventItem = eventItem;                              //   console.log('render2', this._container );
      const oldEventComponent = this._eventComponent;  
      const oldEditEventComponent = this._eventEditorComponent;

      this._eventComponent = new EventCardComponent(this._eventItem);
      this._eventEditorComponent = new EventEditorComponent(this._eventItem, destinations, availableOffers, Mode.EDIT);
                                                    // console.log('render3', this._eventComponent );
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
    if (this._mode === Mode.EDIT) {                                       //     console.log('this._addEventComponent=',this._addEventComponent);
      if (this._addEventComponent) {
        remove(this._addEventComponent);
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
    });

    this._eventEditorComponent.setOnSubmit((evt) => {
      evt.preventDefault();
      const data = this._eventEditorComponent.getFormData();
      const formData = parseFormData(data);
      this._onDataChange(this, EmptyEvent, null);
      this._addEventButtonComponent.setDisabled(false);
    });
  }

  _setEditCardListeners() {
    this._mode = Mode.EDIT;
    this._setEscListener();
    this._eventEditorComponent.setOnSubmit((evt) => {
      evt.preventDefault();
      const data = this._eventEditorComponent.getFormData();
      const formData = parseFormData(data);
      this._onDataChange(this, this._eventItem, data);
      this._showCard();
      console.log(formData);
    });
    this._eventEditorComponent.setOnRollupButtonClick(() => { // console.log('this._eventEditorComponent=',this._eventEditorComponent);
       this._eventEditorComponent.reset();                    // console.log('this._eventEditorComponent=',this._eventEditorComponent)
     this._showCard();
    });
    
  }

  destroy() {
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