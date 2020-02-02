import StatsComponent from '../components/stats';
import {render, RenderPosition} from '../utils/render';

class StatsController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;
    this._statsComponent = new StatsComponent();

    this._shouldChartUpdate = true;

    this._onDataChange = this._onDataChange.bind(this);

    this._eventsModel.addOnDataChange(this._onDataChange);
  }

  render() {
    this._statsComponent.render();
    this._statsComponent.hide();

    render(this._container, this._statsComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  hide() {
    this._statsComponent.hide();
  }

  show() {
    if (this._shouldChartUpdate) {
      this._statsComponent.update(this._eventsModel.getEventsAll());
      this._shouldChartUpdate = false;
    }

    this._statsComponent.show();
  }

  _onDataChange() {
    this._shouldChartUpdate = true;
  }
}

export default StatsController;
