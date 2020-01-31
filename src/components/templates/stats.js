import {makeTemplateGenerator} from './generator';

const createStatsCanvasTemplates = makeTemplateGenerator(({name}) => (
  `<div class="statistics__item statistics__item--${name}">
    <canvas class="statistics__chart  statistics__chart--${name}" width="900">
    </canvas>
  </div>`
));

const createStatsTemplates = (statsTypes) => (
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    ${createStatsCanvasTemplates(statsTypes)}
  </section>`
);

export {createStatsTemplates};
