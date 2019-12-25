// Генерация фильтров
import {FILTERS_TYPES} from '../constants';

const generateFilters = () => {
  return {
    firstPoint: FILTERS_TYPES[0],
    secondPoint: FILTERS_TYPES[1],
    thirdPoint: FILTERS_TYPES[2],
  };
};

const generateFiltersPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilters);
};

export {generateFiltersPoints};
