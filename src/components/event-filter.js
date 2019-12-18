import AbstractComponent from './abstract-component';
import {createFilterFormTemplates} from './templates/event-filter';

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

const getFilterName = (type) => type[0].toUpperCase() + type.slice(1);

const createFilters = (checkedType) => Object.values(FilterType)
  .map((type) => ({
    type,
    name: getFilterName(type),
    isChecked: type === checkedType,
  }));

class EventFilterComponent extends AbstractComponent {
  constructor(filterType = FilterType.EVERYTHING) {
    super();

    this._currentFilterType = filterType;
    this._filters = createFilters(FilterType.EVERYTHING);
  }

  getTemplate() {
    return createFilterFormTemplates(this._filters);
  }
}

export default EventFilterComponent;
export {FilterType};
