import {FilterType} from '../components/event-filter';

const getFutureEvents = (events, nowDate) => 
  events.filter(({startDate}) => startDate > nowDate);

const getPastEvents = (events, nowDate) => 
  events.filter(({startDate}) => startDate < nowDate);

export const getEventsByFilter = (events, filterType) => {
  switch (filterType) {
    case FilterType.FUTURE:
      return getFutureEvents(events, Date.now());
    case FilterType.PAST:
      return getPastEvents(events, Date.now());
  }

  return events;
};