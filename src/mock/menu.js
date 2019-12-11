import {MENU_TYPES} from '../constants';

// Функция генерации меню
const generateMenu = () => {
  return {
    firstPoint: MENU_TYPES[0],
    secondPoint: MENU_TYPES[1],
  };
};

export const generateMenuPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMenu);
};
