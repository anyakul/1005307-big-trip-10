import {RenderPosition, render, replace} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import EventCardComponent from '../components/event-card';
import EditEventFormComponent from '../components/event-editor';

class PointController {

  constructor(container) {
    this._container = container;
    this._events = null;
    //   this._onDataChange = onDataChange;
  }

  render(events) {
    this._events = events;
    const onEscKeyDown = (evt) => {

      if (isEscKey(evt)) {
        replaceEventToEdit();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const replaceEditToEvent = () => {
      replace(this._eventEditComponent, this._eventComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const replaceEventToEdit = () => {
      replace(this._eventComponent, this._eventEditComponent);
    };

    this._eventComponent = new EventCardComponent(this._events);

    this._eventComponent.setEditButtonClickHandler(replaceEditToEvent);

    this._eventEditComponent = new EditEventFormComponent(this._events);
    this._eventEditComponent.setSubmitHandler(replaceEventToEdit);

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }
}

export default PointController;
