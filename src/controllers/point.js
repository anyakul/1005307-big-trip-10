import {RenderPosition, render, replace} from '../utils/render';
import {isEscKey} from '../utils/key-board';
import EventCardComponent from '../components/event-card';
import EventEditorComponent from '../components/event-editor';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

class PointController {

  constructor(container, onViewChange) {
    this._container = container;
    this._onViewChange = onViewChange;
    this._events = null;
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._mode = Mode.DEFAULT;
  }

  render(events) {
    this._events = events;

    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    this._eventComponent = new EventCardComponent(this._events);
    this._eventEditorComponent = new EventEditorComponent(this._events);

    this._setCardListeners();

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.DEFAULT) {
      this._replaceEventToEdit();
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
    this._eventEditorComponent.setSubmitHandler(() => this._replaceEditToEvent());
  }

  _replaceEditToEvent() {
    replace(this._eventComponent, this._eventEditorComponent);
    this._mode = Mode.DEFAULT;
  }

  _replaceEventToEdit() {
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
}

export default PointController;
