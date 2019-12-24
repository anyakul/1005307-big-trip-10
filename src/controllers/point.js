import {RenderPosition, render} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import {replace} from '../utils/render';
import EventCardComponent from '../components/event-card';
import EditEventFormComponent from '../components/edit-event-form';
import {showDate} from '../utils/date';

const renderEvents = (card) => {
  const {dateFromUnix} = card;
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

  const tripEventsList = document.querySelectorAll(`.trip-events__list`);

  tripEventsList.forEach((tripEventItem) => {
    if (showDate(tripEventItem.dataset.date) === `${showDate(dateFromUnix)}`) {
      render(tripEventItem, eventComponent, RenderPosition.BEFOREEND);
    }
  });
};

export default class PointController {

  constructor(container) {
    this._container = container;
  }

  render(events) {
    events.forEach((eventItem) => {
      renderEvents(eventItem);
    });
  }
}
