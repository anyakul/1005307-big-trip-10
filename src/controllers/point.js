import {isEscKey} from '../utils/key-board';
import {RenderPosition, render, replace} from '../utils/render';
import EventCardComponent from '../components/event-card';
import EditEventFormComponent from '../components/edit-event-form';

const renderEvent = (eventListElement, card) => {
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

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

export default class PointController {

  constructor(container) {
    this._container = container;
  }

  render(events) {
    renderEvent(this._container, events);
  }
}
