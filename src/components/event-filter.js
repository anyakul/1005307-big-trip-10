import AbstractComponent from './abstract';
import {createEventFilterTemplates} from './templates/event-filter';

const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

class EventFilterComponent extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createEventFilterTemplates(this._filters);
  }

  setFiltersChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      return handler(evt.target.value);
    });
  }
}

export default EventFilterComponent;
export {FilterType};
