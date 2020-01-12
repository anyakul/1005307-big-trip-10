export default class Events {
  constructor() {
    this._events = [];
  }

  getEvents() {
    return this._events;
  }

  setTasks(events) {
    this._events = Array.from(events);
  }
}
