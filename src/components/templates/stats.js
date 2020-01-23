import {makeTemplateGenerator} from './generator';

const createStatsCanvasTemplate = ({name}) => {
  return (
    `<div class="statistics__item statistics__item--${name}">
      <canvas class="statistics__chart  statistics__chart--${name}" width="900"></canvas>
    </div>`
  );
};

const createStatsCanvasTemplates = makeTemplateGenerator(createStatsCanvasTemplate);

const createStatsTemplates = (statsTypes) => {
  return (
    `<section class="statistics">
      <h2 class="">Trip statistics</h2>
      ${createStatsCanvasTemplates(statsTypes)}
    </section>`
  );
};

export {createStatsTemplates};
