import {makeTemplateGenerator} from './generator';

const createEventFilterTemplate = ({type, name, isChecked = false}) => (
  `<div class="trip-filters__filter">
    <input
      id="filter-${type}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${isChecked ? `checked` : ``}
    >
    <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
  </div>`
);

const createFilterTemplates = makeTemplateGenerator(createEventFilterTemplate);

const createEventFilterTemplates = (filters) => (
  `<form class="trip-filters" action="#" method="get">
    ${createFilterTemplates(filters)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export {createEventFilterTemplates};
