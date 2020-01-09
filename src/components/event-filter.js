import AbstractComponent from './abstract-component';
import {createEventFilterTemplates} from '../templates/event-filter';
import {createTypes} from '../utils/common';

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

class EventFilterComponent extends AbstractComponent {
  constructor(filterType = FilterType.EVERYTHING) {
    super();

    this._currentFilterType = filterType;
    this._filters = createTypes(this._currentFilterType, FilterType);
  }

  getTemplate() {
    return createEventFilterTemplates(this._filters);
  }
}

export default EventFilterComponent;
export {FilterType};
