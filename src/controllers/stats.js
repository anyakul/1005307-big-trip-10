import StatsComponent from '../components/stats';
import {render, RenderPosition} from '../utils/render';

const StatsTypes = {
  MONEY: `money`,
  TRANSPORT: `transport`,
  SPEND: `spend`,
};

class StatsController {
  constructor(container, eventsModel) {
    this._container = container;
    this._statsComponent = null;
    this._eventsModel = eventsModel;
  }

  render() {
    const stats = Object.values(StatsTypes).map((statsType) => ({
      name: statsType,
    }));

    this._statsComponent = new StatsComponent(stats, this._eventsModel);

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
