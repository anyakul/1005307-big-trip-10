// Генерация меню
import {MENU_TYPES} from '../constants';

const generateMenu = () => {
  return {
    firstPoint: MENU_TYPES[0],
    secondPoint: MENU_TYPES[1],
  };
};

const generateMenuPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMenu);
};

export {generateMenuPoints};
