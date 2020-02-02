import TripInfoMainComponent from '../components/trip-info-main';
import TripInfoCostComponent from '../components/trip-info-cost';
import {calcTotalPrice} from '../utils/price';
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
    const events = this._eventsModel.getEvents();
    const price = calcTotalPrice(events);

    this._tripInfoMainComponent = new TripInfoMainComponent(events);
    this._tripInfoCostComponent = new TripInfoCostComponent(price);

    render(this._container, this._tripInfoMainComponent.getElement());
    render(this._container, this._tripInfoCostComponent.getElement());
  }

  _onDataChange() {
    const price = calcTotalPrice(this._eventsModel.getEvents());
    this._tripInfoCostComponent.update(price);
    this._tripInfoMainComponent.update(this._eventsModel.getEvents())
  }
}

export default TripInfoController;
