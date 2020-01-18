import AbstractComponent from './abstract-component';

class TripDaysListComponent extends AbstractComponent {
  getTemplate() {
    return (`<ul class="trip-days"></ul>`);
  }
}

export default TripDaysListComponent;
