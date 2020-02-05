import {SortType} from '../components/event-sorter';

const getSortedByEvent = ([...events]) => events
  .sort((a, b) => a.startDate - b.startDate);

const getSortedByTime = ([...events]) => events
  .sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));

const getSortedByPrice = ([...events]) => events
  .sort((a, b) => b.price - a.price);

const getEventsBySorter = (events, sortType) => {
  switch (sortType) {
    case SortType.EVENT:
      return getSortedByEvent(events);
    case SortType.TIME:
      return getSortedByTime(events);
    case SortType.PRICE:
      return getSortedByPrice(events);
  }

  return events;
};

export {getEventsBySorter};
