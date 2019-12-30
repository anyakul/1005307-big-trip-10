import {RenderPosition, render} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import {replace} from '../utils/render';
import EventCardComponent from '../components/event-card';
import EditEventFormComponent from '../components/event-editor';
import {showDate} from '../utils/date';

const renderEvent = (cardsContainer, card) => {
  const onEscKeyDown = (evt) => {

    if (isEscKey(evt)) {
      replaceEventToEdit();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToEvent = () => {
    replace(eventEditComponent, eventComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const replaceEventToEdit = () => {
    replace(eventComponent, eventEditComponent);
  };

  const eventComponent = new EventCardComponent(card);

  eventComponent.setEditButtonClickHandler(replaceEditToEvent);

  const eventEditComponent = new EditEventFormComponent(card);
  eventEditComponent.setSubmitHandler(replaceEventToEdit);

  render(cardsContainer, eventEditComponent, RenderPosition.BEFOREEND);
};

const renderEvents = (card) => {
  const {dateFromUnix} = card;
  const tripEventsList = document.querySelectorAll(`.trip-events__list`);
  tripEventsList.forEach((tripEventItem) => {
    if (showDate(tripEventItem.dataset.date) === `${showDate(dateFromUnix)}`) {
      renderEvent(tripEventItem, card);
    }
  });
};

const renderSortedEvents = (cards) => {
  const tripEventsList = document.querySelector(`.trip-events__list`);
  renderEvent(tripEventsList, cards);
};

class PointController {

  constructor(container) {
    this._container = container;
  }

  render(events) {
    events.forEach(renderEvents);
  }

  renderSorted(sortedEvents) {
    sortedEvents.forEach(renderSortedEvents);
  }
}

export default PointController;
