import EventFilterComponent, {FilterType} from '../components/event-filter-component';
import {render, RenderPosition} from '../utils/render';

class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._activeFilterType = FilterType.EVERYTHING;
    this._filterComponent = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._eventsModel.addDataChangeHandler(this._onDataChange);
    this._onFilterChange = this._onFilterChange.bind(this);
  }

  render() {
    const container = this._container;

    const filters = Object.values(FilterType).map((filterType) => ({
      name: filterType,
      isChecked: filterType === this._activeFilterType,
    }));

    this._filterComponent = new EventFilterComponent(filters);

    render(container, this._filterComponent, RenderPosition.BEFOREEND);

    this._filterComponent.setFiltersChangeHandler(this._onFilterChange);
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._eventsModel.setFilter(this._activeFilterType);
  }

  _onDataChange() {
    this.render();
  }
}

export default FilterController;
