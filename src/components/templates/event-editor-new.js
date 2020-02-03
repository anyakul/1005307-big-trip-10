import {
  createDestinationTemplate,
  createEventListTemplate,
  createPriceTemplate,
  createScheduleTemplate,
  createTypeTemplate,
} from './event-editor';

const createEventEditorNewTemplate = (eventItem, destinations) => (
  `<form class="trip-events__item event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        ${createTypeTemplate(eventItem)}
        ${createEventListTemplate(eventItem)}
      </div>
      ${createDestinationTemplate(eventItem, destinations)}
      ${createScheduleTemplate(eventItem)}
      ${createPriceTemplate(eventItem)}
      <button class="event__save-btn btn btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
  </form>`
);

export {createEventEditorNewTemplate};
