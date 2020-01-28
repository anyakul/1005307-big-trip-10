import AbstractComponent from './abstract';
import {createEventSorterTemplate} from './templates/event-sorter';

const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

class EventSorterComponent extends AbstractComponent {
  constructor(sorters) {
    super();
    this._sorters = sorters;
    this._active = SortType.EVENT;
  }

  getTemplate() {
    return createEventSorterTemplate(this._sorters);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const {sortType} = evt.target.dataset;

      if (sortType && sortType !== this._active) {
        this._active = sortType;                      //   console.log('event-sorter',this._active);
        handler(this._active);
      }
    });
  }
}

export default EventSorterComponent;
export {SortType};
