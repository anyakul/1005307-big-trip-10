import {menu} from '../const';
import {getRandomArrayItem, getRandomArray, getRandomIntegerNumber} from '../util';

// Функция генерации меню
export const generateMenu = () => {
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
