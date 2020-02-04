import TripInfoMainComponent from '../components/trip-info-main';
import TripInfoCostComponent from '../components/trip-info-cost';
import {render} from '../utils/render';

class TripInfoController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._tripInfoMainComponent = null;
    this._tripInfoCostComponent = null;

    this._onDataChange = this._onDataChange.bind(this);

    this._eventsModel.addOnDataChange(this._onDataChange);
  }

  render() {
    this._tripInfoMainComponent = new TripInfoMainComponent();
    this._tripInfoCostComponent = new TripInfoCostComponent();

    this._update();

    render(this._container, this._tripInfoMainComponent.getElement());
    render(this._container, this._tripInfoCostComponent.getElement());
  }

  _update() {
    const events = this._eventsModel.getEventsAll();

    this._tripInfoMainComponent.update(events);
    this._tripInfoCostComponent.update(events);
  }

  _onDataChange() {
    this._update();
  }
}

export default TripInfoController;
