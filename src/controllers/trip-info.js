import TripInfoMainComponent from '../components/trip-info-main';
import TripInfoCostComponent from '../components/trip-info-cost';
import {render} from '../utils/render';

class TripInfoController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._tripInfoMainComponent = null;
    this._tripInfoCostComponent = null;
    this._updateInfo = this._updateInfo.bind(this);
    this._eventsModel.addDataChangeHandler(this._updateInfo);
  }

  render() {
    this._tripInfoMainComponent = new TripInfoMainComponent(this._eventsModel.getEvents());
    this._tripInfoCostComponent = new TripInfoCostComponent(this._eventsModel.calcTotalAmount());
    render(this._container, this._tripInfoMainComponent.getElement());
    render(this._container, this._tripInfoCostComponent.getElement());
  }

  _updateInfo() {
    this._tripInfoMainComponent.update(this._eventsModel.getEvents());
    this._tripInfoCostComponent.update(this._eventsModel.calcTotalAmount());
  }
}

export default TripInfoController;
