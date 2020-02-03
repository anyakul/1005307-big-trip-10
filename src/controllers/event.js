import {render, replace, remove, RenderPosition} from '../utils/render';
import {isEscKey} from '../utils/key-board';

import EventCardComponent from '../components/event-card';
import EventEditorComponent, {Mode, ActionType} from '../components/event-editor';
import Event from '../models/event';

const SHAKE_ANIMATION_TIMEOUT = 600;

class EventController {
  constructor(container, dispatch) {
    this._container = container;
    this._dispatch = dispatch;

    this._mode = Mode.VIEW;

    this._eventCardComponent = null;
    this._eventEditorComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(eventItem, destinationsModel, offersModel, mode = Mode.EDIT) {
    const oldEventCardComponent = this._eventCardComponent;
    const oldEventEditorComponent = this._eventEditorComponent;

    this._eventCardComponent = new EventCardComponent(eventItem);
    this._eventEditorComponent = new EventEditorComponent(
      eventItem,
      destinationsModel,
      offersModel,
      mode,
    );

    this._eventCardComponent.setOnRollupButtonClick(() => {
      this._replaceViewToEdit();
    });

    this._eventEditorComponent.setOnRollupButtonClick(() => {
      this._replaceEditToView();
    });

    this._eventEditorComponent.setOnCancel(() => {
      this._dispatch(this, {type: ActionType.CANCEL})
    });
    
    this._eventEditorComponent.setOnDelete((evt) => {
      evt.preventDefault();

      this._dispatch(this, {
        type: ActionType.DELETE,
        payload: eventItem.id,
      })
    });

    this._eventEditorComponent.setOnSubmit((evt) => {
      evt.preventDefault();

      const data = this._eventEditorComponent.getData();
      const newEvent = Event.parseEvent(data);

      this._dispatch(this, {
        type: ActionType.SUBMIT,
        payload: newEvent,
      })
    });

    this._eventEditorComponent.setOnFavoriteChange((evt) => {
      const newEvent = Event.clone(eventItem);
      newEvent.isFavorite = evt.target.checked;

      this._dispatch(this, {
        type: ActionType.ADDED_TO_FAVORITE,
        payload: newEvent,
      })
    });

    if (oldEventEditorComponent) {
      replace(this._eventEditorComponent, oldEventEditorComponent);
      replace(this._eventCardComponent, oldEventCardComponent);
    } else {
      render(this._container, this._eventCardComponent.getElement());
    }
  }

  setDefaultView() {
    if (this._mode === Mode.EDIT) {
      this._replaceEditToView();
    }
  }

  destroy() {
    remove(this._eventCardComponent);
    remove(this._eventEditorComponent);

    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  shake() {
    this._toggleShake(true);

    setTimeout(this._toggleShake.bind(this), SHAKE_ANIMATION_TIMEOUT, false);
  }

  _toggleShake(enable) {
    const animation = enable ? `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s` : ``;

    [
      this._eventEditorComponent.getElement(),
      this._eventCardComponent.getElement(),
    ].forEach((element) => {
      element.style.animation = animation;
    })
  }

  _replaceViewToEdit() {
    this._dispatch(this, {type: ActionType.EDIT});
    this._eventEditorComponent.rerender();

    replace(this._eventEditorComponent, this._eventCardComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.EDIT;
  }

  _replaceEditToView() {
    replace(this._eventCardComponent, this._eventEditorComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.VIEW;
  }

  _onEscKeyDown(evt) {
    if (isEscKey(evt)) {
      this._replaceEditToView();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default EventController;
