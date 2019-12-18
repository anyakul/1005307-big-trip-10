import AbstractComponent from './abstract-component';
import {DIRECTION_ICON, createSortFormTemplate} from './templates/event-sorter';

const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

const SortTypeName = {
  [SortType.EVENT]: `Event`,
  [SortType.TIME]: `Time ${DIRECTION_ICON}`,
  [SortType.PRICE]: `Price ${DIRECTION_ICON}`,
};

const createSorters = (checkedType) => Object.entries(SortTypeName)
  .map(([type, name]) => ({type, name, isChecked: type === checkedType}));

class EventSorterComponent extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.EVENT;
    this._sorters = createSorters(this._currentSortType);
  }

  getTemplate() {
    return createSortFormTemplate(this._sorters);
  }

  setSortChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const sortType = evt.target.value;

      if (this._currentSortType !== sortType) {
        this._currentSortType = sortType;
      }

      handler(this._currentSortType);
    });
  }
}

export default EventSorterComponent;
export {SortType};
