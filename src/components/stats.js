import AbstractComponent from './abstract';
import {createStatsTemplates} from './templates/stats';

class StatsComponent extends AbstractComponent {
  constructor(statsTypes) {
    super();
    this._statsTypes = statsTypes;
  }

  getTemplate() {
    return createStatsTemplates(this._statsTypes);
  }
}

export default StatsComponent;
