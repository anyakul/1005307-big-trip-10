import {menu} from '../const';

// Функция генерации меню
const generateMenu = () => {
  return {
    firstPoint: menu[0],
    secondPoint: menu[1],
  };
};

export const generateMenuPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateMenu);
};
