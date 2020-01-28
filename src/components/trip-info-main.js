// Маршрут поездки
import AbstractComponent from './abstract';
import {createTripInfoMainTemplate} from './templates/trip-info-main';

class TripInfoMainComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._events);
  }
  
  update(events) {
    this._events = events;
    return createTripInfoMainTemplate(events);
   // this._updateInfoTitle(events);
   // this._updateInfoDates(events);
  }

  _updateInfoTitle(events) {
    if (events.length === 0) {
      this.getElement().querySelector(`.trip-info__title`).innerHTML = ``;
      return;
    }
    
    this.getElement().querySelector(`.trip-info__title`).innerHTML = datesTemplate;
  }

  _updateInfoDates(events) {
    if (events.length === 0) {
      this.getElement().querySelector(`.trip-info__dates`).innerHTML = ``;
      return;
    }
    const titlesTemplate = createTripInfoMainTemplate(sortByStartDate(events));
    this.getElement().querySelector(`.trip-info__dates`).innerHTML = titlesTemplate;
  }
}

export default TripInfoMainComponent;
