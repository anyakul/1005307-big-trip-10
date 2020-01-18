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

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const {sortType} = evt.target.dataset;

      if (sortType && sortType !== this._active) {
        this._active = sortType;
        handler(sortType);
      }
    });
  }
}

export default EventSorterComponent;
export {SortType};
