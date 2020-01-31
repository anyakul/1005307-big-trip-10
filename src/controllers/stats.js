import StatsComponent from '../components/stats';
import {render, RenderPosition} from '../utils/render';

class StatsController {
  constructor(container, eventsModel) {
    this._container = container;
    this._eventsModel = eventsModel;

    this._statsComponent = null;
  }

  render() {
    this._statsComponent = new StatsComponent(this._eventsModel);
    this._statsComponent.render();

    render(this._container, this._statsComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  hide() {
    this._statsComponent.hide();
  }

  show() {
    this._statsComponent.show();
  }
}

export default StatsController;
