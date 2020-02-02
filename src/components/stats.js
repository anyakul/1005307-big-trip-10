import AbstractComponent from './abstract';
import {createStatsTemplates} from './templates/stats';

import {makeChart, makeChartData} from '../utils/chart';
import {getChartData} from '../utils/chart-data';
import {getStats} from '../utils/stats';
import {formatDuration} from '../utils/date';

const StatsType = {
  MONEY: `money`,
  TRANSPORT: `transport`,
  SPEND: `spend`,
};

const Sign = {
  EURO: `\u{20AC}`,
};

const statsTypes = Object.values(StatsType)
  .map((name) => ({name}));

const formatMoney = (value) => `${Sign.EURO} ${value}`;

class StatsComponent extends AbstractComponent {
  constructor() {
    super();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
  }

  getTemplate() {
    return createStatsTemplates(statsTypes);
  }

  render() {
    const element = this.getElement();

    const moneyBlock = element.querySelector(`.statistics__chart--money`);
    const timeBlock = element.querySelector(`.statistics__chart--spend`);
    const transportBlock = element.querySelector(`.statistics__chart--transport`);

    this._moneyChart = makeChart(moneyBlock, {
      title: `Money`,
      formatter: formatMoney,
    });

    this._transportChart = makeChart(transportBlock, {
      title: `Transport`,
    });

    this._timeChart = makeChart(timeBlock, {
      title: `Time-Spend`,
      formatter: formatDuration,
    });
  }

  update(events) {
    const stats = getStats(events);

    const moneyData = getChartData(stats, StatsType.MONEY);
    const transportData = getChartData(stats, StatsType.TRANSPORT);
    const timeData = getChartData(stats, StatsType.TIME);

    this._moneyChart.data = makeChartData(moneyData);
    this._moneyChart.update();

    this._transportChart.data = makeChartData(transportData);
    this._transportChart.update();

    this._timeChart.data = makeChartData(timeData);
    this._timeChart.update();
  }
}

export default StatsComponent;
export {StatsType};
