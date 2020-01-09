import AbstractComponent from './abstract-component';
import {createSortBoardComponent} from '../templates/sort-board';

class SortBoardContainer extends AbstractComponent {
  getTemplate() {
    return createSortBoardComponent();
  }
}

export default SortBoardContainer;
