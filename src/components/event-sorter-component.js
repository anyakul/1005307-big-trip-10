import AbstractComponent from './abstract-component';
import {createEventSorterTemplate} from './templates/event-sorter-template';

const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

class EventSorterComponent extends AbstractComponent {
  constructor(sorters) {
    super();
    this._sorters = sorters;
  }

  getTemplate() {
    return createEventSorterTemplate(this._sorters);
  }

  setSorterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      handler(evt.target.value);
    });
  }
}

export default EventSorterComponent;
export {SortType};
