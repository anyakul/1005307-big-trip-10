import {RenderPosition, render, replace} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import EventCardComponent from '../components/event-card-component';
import EventEditorComponent from '../components/event-editor-component';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

class EventsController {

  constructor(eventItem, onViewChange) {
    this._eventComponent = null;
    this._editEventComponent = null;
    this._onViewChange = onViewChange;
    this._eventItem = eventItem;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._mode = Mode.DEFAULT;
    this._eventComponent = new EventCardComponent(this._eventItem);
    this._eventEditorComponent = new EventEditorComponent(this._eventItem);
  }

  render(container) {
    this._container = container;

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._setCardListeners();

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  _setCardListeners() {
    this._eventComponent.setRollUpButtonClickHandler(() => {
      this._replaceEventToEdit();
    });
  }

  _setEditCardListeners() {
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._eventEditorComponent.setRollUpButtonClickHandler(() => this._replaceEditToEvent());
    this._eventEditorComponent.setSubmitHandler((evt) => {
      evt.preventDefault();
      this._replaceEditToEvent();
    });
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditorComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditorComponent, this._eventComponent);
    this._mode = Mode.EDIT;
    this._setEditCardListeners();
  }

  _onEscKeyDown(evt) {
    if (isEscKey(evt)) {
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  setEventToDay(card, container) {
    let renderedEvent = null;
    container.forEach((tripEventItem) => {
      if (tripEventItem.dataset.date === this._eventComponent.getEventCardDate(card)) {
        renderedEvent = this.render(tripEventItem);
      }
    });
    return renderedEvent;
  }

  setEvent(containers) {
    return this.render(containers);
  }
}

export default EventsController;
