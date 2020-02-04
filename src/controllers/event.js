import {render, replace, remove, RenderPosition} from '../utils/render';
import {isEscKey} from '../utils/key-board';

import EventCardComponent from '../components/event-card';
import EventEditorComponent, {Mode, ActionType} from '../components/event-editor';
import Event from '../models/event';

const SHAKE_ANIMATION_TIMEOUT = 600;

const DeleteButtonText = {
  DEFAULT: `Delete`,
  PENDING: `Deleting...`
};

const SaveButtonText = {
  DEFAULT: `Save`,
  PENDING: `Saving...`,
};

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
        mode
    );

    this._subscribeOnEvents(eventItem, mode);

    switch (mode) {
      case Mode.EDIT:
        if (oldEventEditorComponent) {
          replace(this._eventEditorComponent, oldEventEditorComponent);
          replace(this._eventCardComponent, oldEventCardComponent);
        } else {
          render(this._container, this._eventCardComponent.getElement());
        }

        break;

      case Mode.ADD:
        if (oldEventEditorComponent && oldEventCardComponent) {
          remove(oldEventCardComponent);
          remove(oldEventEditorComponent);
        }

        this._eventEditorComponent.rerender();
        render(this._container, this._eventEditorComponent.getElement(), RenderPosition.AFTERBEGIN);
        document.addEventListener(`keydown`, this._onEscKeyDown);

        this._mode = mode;
        break;
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

    setTimeout(() => {
      this._toggleShake(false);

      this._eventEditorComponent.setState({
        saveButtonText: SaveButtonText.DEFAULT,
        deleteButtonText: DeleteButtonText.DEFAULT,
      });
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _subscribeOnEvents(eventItem, mode) {
    this._eventCardComponent.setOnRollupButtonClick(() => {
      this._replaceViewToEdit();
    });

    this._eventEditorComponent.setOnRollupButtonClick(() => {
      this._replaceEditToView();
    });

    this._eventEditorComponent.setOnCancel(() => {
      this._dispatch(this, {type: ActionType.CANCEL});
    });

    this._eventEditorComponent.setOnDelete((evt) => {
      evt.preventDefault();

      this._eventEditorComponent.setState({
        deleteButtonText: DeleteButtonText.PENDING,
      });

      this._dispatch(this, {
        type: ActionType.DELETE,
        payload: eventItem.id,
      });
    });

    this._eventEditorComponent.setOnSave((evt) => {
      evt.preventDefault();

      this._eventEditorComponent.setState({
        saveButtonText: SaveButtonText.PENDING,
      });

      const data = this._eventEditorComponent.getData();
      const newEvent = Event.parseEvent(data);

      this._dispatch(this, {
        type: mode === Mode.EDIT ? ActionType.UPDATE : ActionType.CREATE,
        payload: newEvent,
      });
    });

    this._eventEditorComponent.setOnFavoriteChange((evt) => {
      const newEvent = Event.clone(eventItem);
      newEvent.isFavorite = evt.target.checked;

      this._dispatch(this, {
        type: ActionType.ADD_TO_FAVORITE,
        payload: newEvent,
      });
    });
  }

  _toggleShake(enable) {
    const animation = enable ? `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s` : ``;

    [
      this._eventEditorComponent.getElement(),
      this._eventCardComponent.getElement(),
    ].forEach((element) => {
      element.style.animation = animation;
    });
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
      if (this._mode === Mode.ADD) {
        this._dispatch(this, {type: ActionType.CANCEL});
      }

      this.setDefaultView();

      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }
}

export default EventController;
