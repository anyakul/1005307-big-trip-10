import {
  createDestinationSectionTemplate,
  createDestinationTemplate,
  createEventListTemplate,
  createFavoriteButtonTemplate,
  createOffersTemplate,
  createPriceTemplate,
  createScheduleTemplate,
  createTypeTemplate,
} from './event-editor';

const createEventEditorEditTemplate = (eventItem, offers, destination, destinations) => (
  `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          ${createTypeTemplate(eventItem)}
          ${createEventListTemplate(eventItem)}
        </div>
        ${createDestinationTemplate(eventItem, destinations)}
        ${createScheduleTemplate(eventItem)}
        ${createPriceTemplate(eventItem)}
        <button class="event__save-btn btn btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        ${createFavoriteButtonTemplate(eventItem)}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offers.length > 0 ? createOffersTemplate(offers) : ``}
        ${destination.name.length > 0 ? createDestinationSectionTemplate(destination) : ``}
      </section>
    </form>
  </li>`
);

export {createEventEditorEditTemplate};
