import {
  createDestinationTemplate,
  createDetailsTemplate,
  createEventListTemplate,
  createPriceTemplate,
  createSaveButton,
  createScheduleTemplate,
  createTypeTemplate,
} from './event-editor';

const createEventEditorAddTemplate = (eventItem, offers, destination, destinations) => (
  `<form class="trip-events__item event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        ${createTypeTemplate(eventItem)}
        ${createEventListTemplate(eventItem)}
      </div>
      ${createDestinationTemplate(eventItem, destinations)}
      ${createScheduleTemplate(eventItem)}
      ${createPriceTemplate(eventItem)}
      ${createSaveButton()}
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    ${destination.name.length > 0 ? createDetailsTemplate(destination, offers) : ``}
  </form>`
);

export {createEventEditorAddTemplate};
