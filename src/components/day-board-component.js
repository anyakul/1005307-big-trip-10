import AbstractComponent from './abstract-component';
import {createDayBoardTemplates} from './templates/day-board-template';

class DayBoardComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createDayBoardTemplates(this._events);
  }
}

export default DayBoardComponent;
