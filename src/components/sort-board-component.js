import AbstractComponent from './abstract-component';
import {createSortBoardTemplate} from './templates/sort-board-template';

class SortBoardContainer extends AbstractComponent {
  getTemplate() {
    return createSortBoardTemplate();
  }
}

export default SortBoardContainer;
