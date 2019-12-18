import {makeTemplateGenerator} from './generator';

const createActiveTab = (isActive) => isActive ? `trip-tabs__btn--active` : ``;

const createTabTemplate = ({tab, name, isActive = false}) =>
  `<a href="#" data-menu-tab="${tab}" class="trip-tabs__btn ${createActiveTab(isActive)}">${name}</a>`;

const createTabTemplates = makeTemplateGenerator(createTabTemplate);

const createMenuTemplate = (tabs) => (
  `<nav class="trip-controls__trip-tabs trip-tabs">
    ${createTabTemplates(tabs)}
  </nav>`
);

export {createMenuTemplate};
