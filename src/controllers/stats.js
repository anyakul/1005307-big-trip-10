import StatsComponent from '../components/stats';
import {render} from '../utils/render';

const StatsTypes = {
  MONEY: `money`,
  TRANSPORT: `transport`,
  SPEND: `spend`,
};

class StatsController {
  constructor(container) {
    this._container = container;
    this._statsComponent = null;
  }

  render() {
    const stats = Object.values(StatsTypes).map((statsType) => ({
      name: statsType,
    }));

    this._statsComponent = new StatsComponent(stats);

    render(this._container, this._statsComponent.getElement());
  }
}

export default StatsController;
