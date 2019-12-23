import {showDate} from '../utils/date';
import {createBoardTemplate} from './templates/day';
import AbstractComponent from './abstract-component';

const createDays = (objs) => Object.values(objs)
  .map((obj) => ({
    dayNumber: obj.dayNumber,
    date: showDate(obj.dateFromUnix),
  }));

class DayComponent extends AbstractComponent {
  constructor(events) {
    super();
    this._card = createDays(events);
  }

  getTemplate() {
    return createBoardTemplate(this._card);
  }
}

export default DayComponent;
