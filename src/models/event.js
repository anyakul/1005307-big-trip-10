class Event {
  constructor(eventItem) {
    this.id = +eventItem[`id`];
    this.type = eventItem[`type`];
    this.startDate = new Date(eventItem[`date_from`]);
    this.endDate = new Date(eventItem[`date_to`]);
    this.destination = eventItem[`destination`];
    this.price = eventItem[`base_price`];
    this.offers = eventItem[`offers`];
    this.isFavorite = eventItem[`is_favorite`];
  }

  toRAW() {
    return {
      'id': `${this.id}`,
      'type': this.type,
      'date_from': this.startDate,
      'date_to': this.endDate,
      'destination': this.destination,
      'base_price': this.price,
      'offers': this.offers,
      'is_favorite': this.isFavorite
    };
  }

  static parseEvent(eventItem) {
    return new Event(eventItem);
  }

  static parseEvents(eventItem) {
    return eventItem.map(Event.parseEvent);
  }

  static clone(eventItem) {
    return new Event(eventItem.toRAW());
  }
}

export default Event;
