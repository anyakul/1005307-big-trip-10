import {ACTIVITY_EVENTS, TRANSFER_EVENTS} from '../const';

const EVENT_TYPES = [
  ...ACTIVITY_EVENTS,
  ...TRANSFER_EVENTS,
];

const createEmptyStats = (types) => types
  .reduce((stats, type) => {
    stats[type] = {time: 0, used: 0, price: 0};
    return stats;
  }, {});

const reduceStats = (stats, {type, price, startDate, endDate}) => {
  const stat = stats[type];

  stat.time += endDate - startDate;
  stat.used += 1;
  stat.price += price;

  return stats;
};

const getStats = (events) => events
  .reduce(reduceStats, createEmptyStats(EVENT_TYPES));

export {getStats};
