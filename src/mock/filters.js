import {filters} from '../const';

// Функция генерации меню
export const generateFilters = () => {
  return {
    firstPoint: filters[0],
    secondPoint: filters[1],
    thirdPoint: filters[2],
  };
};

export const generateFiltersPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilters);
};