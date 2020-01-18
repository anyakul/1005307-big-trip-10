import AbstractComponent from './abstract';
import {createSortBoardTemplate} from './templates/sort-board';

class SortBoardContainer extends AbstractComponent {
  getTemplate() {
    return createSortBoardTemplate();
  }
}

export default SortBoardContainer;
