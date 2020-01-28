import EventFilterComponent, {FilterType} from '../components/event-filter';
import {render} from '../utils/render';

class FilterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
                                                                     
    this._activeFilterType = FilterType.EVERYTHING;                    
    this._filterComponent = null;
    
    this._onDataChange = this._onDataChange.bind(this);    
    this._onFilterChange = this._onFilterChange.bind(this);

    this._eventsModel.addDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;

    const filters = Object.values(FilterType).map((filterType) => ({
      name: filterType,
      isChecked: filterType === this._activeFilterType,
    }));
 //  console.log(filters);

    this._filterComponent = new EventFilterComponent(filters);

    render(container, this._filterComponent.getElement());

    this._filterComponent.setChangeHandler(this._onFilterChange); 
                                                                         
                                                                //       console.log('filter',this._onFilterChange);
                                                               //console.log(`результат`, this._filterComponent.setChangeHandler(this._onFilterChange));
  }

  _onFilterChange(filterType) {                                  console.log(`yes0`, filterType);
    this._eventsModel.setFilter(filterType);                 //    console.log(`yes1`, this._eventsModel.setFilter(filterType));
    this._activeFilterType = filterType;                     //   console.log(`yes2`, this._activeFilterType);
  }

  _onDataChange() { 
    this.render();
  }
}

export default FilterController;
