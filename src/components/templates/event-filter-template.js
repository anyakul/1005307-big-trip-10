import {makeTemplateGenerator} from './generator';

const createEventFilterTemplate = ({name, isChecked}) => (
  `<div class="trip-filters__filter">
    <input
      id="filter-${name}"
      class="trip-filters__filter-input visually-hidden"
      type="radio"
      name="trip-filter"
      value="${name}"
      ${isChecked ? `checked` : ``}
      >
    <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
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
