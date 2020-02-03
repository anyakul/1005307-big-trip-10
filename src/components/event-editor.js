import AbstractSmartComponent from './abstract-smart';
import {createEventEditorTemplate} from './templates/event-editor';
import {Mode} from './events';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {formatDateTime} from '../utils/date';

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

const defaultConfig = {
  [`altFormat`]: `d/m/y H:m`,
  [`altInput`]: true,
  [`dateFormat`]: `Z`,
  [`enableTime`]: true,
  [`time_24hr`]: true,
};

const createFlatpickr = (element, config = {}) =>
  flatpickr(element, Object.assign({}, defaultConfig, config));

const removeFlatpickr = (element) =>
  element._flatpickr && element._flatpickr.destroy();
  
const getDates = (start, end) => {
  return {
    eventStartDate: formatDateTime(start),
    eventsEndDate: formatDateTime(end),
  }
}

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
    this._externalData = DefaultData;    
    this._flatpickr = null;
    this._element = this.getElement();                                     //  console.log('this._element',this._element);
    this._startDateInput = this._element.querySelector(`input[name=event-start-time]`);
    this._endDateInput = this._element.querySelector(`input[name=event-end-time]`);
 //   this._applyFlatpickr();
    this._eventForReset = Object.assign({}, event);
    this._element = this.getElement();

    this._startDateInput = this._element.querySelector(`input[name=event-start-time]`);
    this._endDateInput = this._element.querySelector(`input[name=event-end-time]`);
    this._resetHandler = null;
    this._submitHandler = null;
    this._deleteHandler = null;
    this._favoriteHandler = null;

  /*  this._flatpickrStartDate = createFlatpickr(this._startDateInput, {
      defaultDate: new Date(this._events.startDate),           
      onClose: () => {
        this._flatpickrStartDate.set(`minDate`, this._startDateInput.value);
      }
    });

    this._flatpickrEndDate = createFlatpickr(this._endDateInput, {
      defaultDate: new Date(this._events.endDate),
      onClose: () => {
        this._flatpickrEndDate.set(`maxDate`, this._endDateInput.value);
      }
    });*/
    this._subscribeOnEvents();
  } 

  getTemplate() {
    return createEventEditorTemplate(this._events, this._destinations, this._availableOffers, this._mode, this._details);
  }
 
  setOnSubmit(handler) {
    if (!this._submitHandler) {
      this._submitHandler = handler;
    }
   /* this.getElement().querySelector(`.event__save-btn`)
    .addEventListener(`click`, handler);*/
 //   if (this._mode === Mode.ADD) {
   //   this.getElement().addEventListener(`submit`, this._submitHandler);// console.log('handler=',this._submitHandler);
  //  } else { 
        this.getElement().addEventListener(`submit`, this._submitHandler);      
  //  }
  }
  
  setOnDelete(handler) {
    if (!this._deleteHandler) {
      this._deleteHandler = handler;
    }
        this.getElement().addEventListener(`reset`, this._deleteHandler);
        
  //  }
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
  //  this.rerender();
  }

  setOnCancel(handler) {
    this.getElement().addEventListener(`reset`, handler);
    this._cancelHandler = handler;
  }

  setOnRollupButtonClick(handler) {
   // if (!this._resetHandler) {
   // this._resetHandler = handler;
  //  }
    if (this._mode !== Mode.ADD) {
      this.getElement().querySelector(`.event__rollup-btn`)
        .addEventListener(`click`, handler);   
      }
  }

  recoveryListeners() {
   /* if (this._mode !== Mode.ADD) {*/
    this.setOnRollupButtonClick(this._resetHandler); console.log('YES3');
    this.setOnSubmit(this._submitHandler);
    this.setOnDelete(this._deleteHandler)
    this._subscribeOnEvents();
    this._flatpickrStartDate;
     
  }

  rerender() {
    super.rerender();
    this.applyFlatpickr();
  }

  reset() {
    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    if (this._mode === Mode.EDIT) {
      element.querySelector(`.event__favorite-checkbox`).addEventListener(`change`, () => {
        this._events = Object.assign({}, this._events, {isFavorite: !this._events.isFavorite});
        this.rerender();
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
    
 
    
    
   if (this._availableOffers.length > 0) {  
      element.querySelectorAll(`.event__offer-checkbox`).forEach((checkbox) => checkbox.addEventListener(`click`, () => {
        if (checkbox.hasAttribute(`checked`)) {
          checkbox.removeAttribute(`checked`); //console.log('checkbox1',checkbox, this.getFormData(),offers);
          
        } else {
          checkbox.setAttribute(`checked`, ``); console.log('checkbox2',checkbox,this.getFormData().offers );
        }    
      }  
      ));
     }

  

    element.querySelector(`input[name=event-start-time]`).addEventListener(`change`, (evt) => {
      this._events.startDate = formatDateTime(evt.target.value);
      this._flatpickrStartDate;
    });

    element.querySelector(`input[name=event-end-time]`).addEventListener(`change`, (evt) => {
      this._events.endDate = formatDateTime(evt.target.value);
      this._flatpickrEndDate;
    });

    element.querySelector(`.event__input--price`).addEventListener(`change`, (evt) => {
      this._events.price = +evt.target.value;
    });
  }

  removeElement() {
 /*   if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }*/

    super.removeElement();
  }

  getFormData() {
    const form =  this._mode === Mode.ADD ? this.getElement() : this.getElement().querySelector(`form`);
    const formData = new FormData(form);
    const checkedOffersLabels = [
      ...document.querySelectorAll(`.event__offer-checkbox[checked=""]+label[for^="event-offer"]`)
    ]; console.log('checkedOffersLabels',checkedOffersLabels);

    return {
      id: this._events.id,
      type: formData.get(`event-type`),
      startDate: formData.get(`event-start-time`),
      endDate: formData.get(`event-end-time`),
      destination: Object.assign({}, this._destinations.getDestinationByName(formData.get(`event-destination`))),
      price: +formData.get(`event-price`),
      offers: checkedOffersLabels.map((offer) => ({
        title: offer.querySelector(`.event__offer-title`).textContent,
        price: Number(offer.querySelector(`.event__offer-price`).textContent)
      })),
      isFavorite: this._events.isFavorite
    };
  }
/*_applyFlatpickr() {
    this._removeFlatpickr();

    const [startDateInput, endDateInput] = Array.from(this.getElement().querySelectorAll(`.event__input--time`));
    this._flatpickr.START = this._createFlatpickrInput(startDateInput, this._tripCard.startDate);
    this._flatpickr.END = this._createFlatpickrInput(endDateInput, this._tripCard.endDate);
  }
*/  
  
  applyFlatpickr() {
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
      formatDate: formatDateTime
    });

    this._flatpickr.END = flatpickr(endDateInput, {
      enableTime: true,
      allowInput: true,
      defaultDate: this._events.endDate,
      formatDate: formatDateTime
    });
  }
}

 export default EventEditorComponent;
/*_setTimeValidation() {
    const startDateInput = this.getElement().querySelector(`input[name=event-start-time]`);
    if (getDatesDiff(this._tripCard.startDate, this._tripCard.endDate) > 0) {
      startDateInput.setCustomValidity(`The start time should be earlier than the end time`);
      this.getElement().querySelector(`.event__save-btn`).disabled = true;
    } else {
      startDateInput.setCustomValidity(``);
      this.getElement().querySelector(`.event__save-btn`).disabled = false;
    }
  } 
 _createFlatpickrInput(node, date) {
    return flatpickr(node, {
      allowInput: true,
      enableTime: true,
      defaultDate: new Date(date),
      dateFormat: `d/m/Y H:i`,
      onValueUpdate: (pickerDate) => {
        if (node.name === `event-start-time`) {
          this._tripCard = Object.assign({}, this._tripCard,
              {startDate: pickerDate[0]}
          );
        } else {
          this._tripCard = Object.assign({}, this._tripCard,
              {endDate: pickerDate[0]}
          );
        }
        this._setTimeValidation();
      }
    });
  }*/
  
   export {getDates};