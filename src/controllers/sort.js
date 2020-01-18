import EventSorterComponent, {SortType} from '../components/event-sorter';
import {render} from '../utils/render';

export default class SortController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._activeSorterType = SortType.EVENT;
    this._sortComponent = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  render() {
    const container = this._container;

    const sorters = Object.values(SortType).map((sorterType) => ({
      name: sorterType,
      isChecked: sorterType === this._activeSorterType,
    }));

    this._sorterComponent = new EventSorterComponent(sorters);

    render(container, this._sorterComponent.getElement());

    this._sorterComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  get() {
    this._sorterComponent.getElement().children[0].innerHTML = `Day`;
  }

  _onSortTypeChange(sortType) {
    this._sortType = sortType;
    this._eventsModel.setSorter(sortType);
    this._renderWithSortType();
  }
}
