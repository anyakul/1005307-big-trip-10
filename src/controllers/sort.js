import EventSorterComponent, {SortType} from '../components/event-sorter';
import {render} from '../utils/render';

class SorterController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._activeSorterType = SortType.EVENT;
    this._sortComponent = null;
  }

  render() {
    const container = this._container;

    const sorters = Object.values(SortType).map((sorterType) => ({
      name: sorterType,
      isChecked: sorterType === this._activeSorterType,
    }));

    this._sortComponent = new EventSorterComponent(sorters);

    render(container, this._sortComponent.getElement());
  }

  setSorterTypeHandler(method) {              
    this._sortComponent.setSortTypeChangeHandler(method);    //console.log('sort',this._sortComponent.setSortTypeChangeHandler(method););
  }
}

export default SorterController;
