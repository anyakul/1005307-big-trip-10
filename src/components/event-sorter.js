import AbstractComponent from './abstract';
import {createEventSorterTemplate} from './templates/event-sorter';

const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

class EventSorterComponent extends AbstractComponent {
  constructor(sortType = SortType.EVENT) {
    super();

    this._currentSortType = sortType;
  }

  getTemplate() {
    const sorters = Object.values(SortType).map((name) => ({
      name,
      isChecked: name === this._currentSortType,
    }));

    return createEventSorterTemplate(sorters);
  }

  setOnSortTypeChange(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const sortType = evt.target.value;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      handler(sortType);
    });
  }
}

export default EventSorterComponent;
export {SortType};
