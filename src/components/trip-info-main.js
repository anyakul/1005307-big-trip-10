import AbstractComponent from './abstract';
import {createTripInfoMainTemplate} from './templates/trip-info-main';

import {SortType} from './event-sorter';
import {getEventsBySorter} from '../utils/sort';
import {formatMonthDay} from '../utils/date';

const DESTINATIONS_TRUNCATE = 3;

const Separator = {
  DASH: ` — `,
  ELLIPSIS: ` — … — `,
};

const getFirstItem = (array) => array[0];
const getLastItem = (array) => array[array.length - 1];

const formatRoute = (sortedEvents) => {
  const destinations = sortedEvents.map(({destination}) => destination.name);
  const uniqueNames = new Set(destinations);

  return uniqueNames.size > DESTINATIONS_TRUNCATE
    ? getFirstItem(destinations) + Separator.ELLIPSIS + getLastItem(destinations)
    : destinations.join(Separator.DASH);
};

const formatDates = (sortedEvents) => {
  const startDate = getFirstItem(sortedEvents).startDate;
  const endDate = getLastItem(sortedEvents).startDate;

  return `${formatMonthDay(startDate)} ${Separator.DASH} ${formatMonthDay(endDate)}`;
};

class TripInfoMainComponent extends AbstractComponent {
  constructor() {
    super();

    this._route = ``;
    this._dates = ``;
  }

  getTemplate() {
    return createTripInfoMainTemplate(this._route, this._dates);
  }

  update(events) {
    const sortedEvents = getEventsBySorter(events, SortType.EVENT);

    this._route = formatRoute(sortedEvents);
    this._dates = formatDates(sortedEvents);

    this.getElement()
      .querySelector(`.trip-info__title`).textContent = this._route;
    this.getElement()
      .querySelector(`.trip-info__dates`).textContent = this._dates;
  }
}

export default TripInfoMainComponent;
