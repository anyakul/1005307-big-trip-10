// Сообщение об отсутствии точек маршрута
import AbstractComponent from './abstract-component';
import {createNoEventsTemplate} from './templates/no-events-template';

class NoEventsComponent extends AbstractComponent {
  getTemplate() {
    return createNoEventsTemplate();
  }
}

export default NoEventsComponent;
