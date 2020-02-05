import AbstractComponent from './abstract';
import {createNoEventsTemplate} from './templates/no-events';

class NoEventsComponent extends AbstractComponent {
  getTemplate() {
    return createNoEventsTemplate();
  }
}

export default NoEventsComponent;
