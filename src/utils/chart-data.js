import {StatsType} from '../components/stats';
import {TRANSFER_EVENTS } from '../const';
import {formatTypeWithEmoji} from './emojis';

const makeStatsSorter = (value) => 
  ([, a], [_, b]) => b[value] - a[value];

const makeStatsReducer = (value) => 
  (result, [type, stats]) => {
    result.labels.push(formatTypeWithEmoji(type));
    result.values.push(stats[value]);
    return result;
  };

const sortByPrice = makeStatsSorter('price');
const sortByUsed = makeStatsSorter('used');
const sortByTime = makeStatsSorter('time');

const reduceByPrice = makeStatsReducer('price');
const reduceByUsed = makeStatsReducer('used');
const reduceByTime = makeStatsReducer('time');

const filterByTransfer = ([type]) => TRANSFER_EVENTS.includes(type);

const getMoneyData = (stats, inicialData) => stats
  .sort(sortByPrice)
  .reduce(reduceByPrice, inicialData);

const getTransportData = (stats, inicialData) => stats
  .filter(filterByTransfer)
  .sort(sortByUsed)
  .reduce(reduceByUsed, inicialData);

const getTimeData = (stats, inicialData) => stats
  .sort(sortByTime)
  .reduce(reduceByTime, inicialData);

const getChartData = (stats, type) => {
  const entries = Object.entries(stats);
  const data = {labels: [], values: []};

  switch(type) {
    case StatsType.MONEY:
      return getMoneyData(entries, data);
    case StatsType.TRANSPORT:
      return getTransportData(entries, data);
    case StatsType.TIME:
      return getTimeData(entries, data);
  }

  return data;
};

export {getChartData};