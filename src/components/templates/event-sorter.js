import {makeTemplateGenerator} from './generator';

const createSortTemplate = ({name, isChecked = false}) => (
  `<div class="trip-sort__item trip-sort__item--event">
    <input
      id="sort-${name}"
      class="trip-sort__input visually-hidden"
      type="radio"
      name="trip-sort"
      value="${name}"
      data-sort-type="${name}"
      ${isChecked ? `checked` : ``}
    >
    <label class="trip-sort__btn" for="sort-${name}">${name}</label>
  </div>`
);

const createSortTemplates = makeTemplateGenerator(createSortTemplate);

const createEventSorterTemplate = (sorters) => (
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
    <span class="trip-sort__item trip-sort__item--day">Day</span>
    ${createSortTemplates(sorters)}
    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`
);

export {
  createEventSorterTemplate,
};
