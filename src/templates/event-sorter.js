import {makeTemplateGenerator} from './generator';

const createSortTemplate = ({type, name, isChecked = false}) => (
  `<div class="trip-sort__item trip-sort__item--event">
    <input
      id="sort-${type}"
      class="trip-sort__input visually-hidden"
      type="radio"
      name="trip-sort"
      value="${type}"
      ${isChecked ? `checked` : ``}
    >
    <label class="trip-sort__btn" for="sort-${type}">${name}</label>
  </div>`
);

const createSortTemplates = makeTemplateGenerator(createSortTemplate);

const createSortFormTemplate = (sorters) => (
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
    <span class="trip-sort__item trip-sort__item--day">Day</span>
    ${createSortTemplates(sorters)}
    <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
  </form>`
);

const DIRECTION_ICON =
  `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
    <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
  </svg>`;

export {
  DIRECTION_ICON,
  createSortFormTemplate,
};
