// шаблон информиции о поездке
import {createTripInfoTemplate} from './components/trip-info';

// шаблон меню
import {createMenuTemplate} from './components/menu';

// Шаблон фильтров
import {createFiltersTemplate} from './components/filters-form';

// Шаблон сортировки событий
import {createSortEventsTemplate} from './components/sort-events';

// Шаблон формы события
import {createEventFormTemplate} from './components/event-form';

// шаблон информиции о дне
import {createDaysInfoTemplate} from './components/days';

//  Шаблон карточки события
import {cardTemplates} from './components/event-card';

// Шаблон списка дней
const createTripsDayTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

// Шаблон списка дней
const createDaysTemplate = () => {
  return (
    `<li class="trip-days__item day"></li>`
  );
};

// Шаблон списка событий дня
const createEventsListTemplate = () => {
  return (
    `<ul class="trip-events__list"></ul>`
  );
};

// Функция для рендеринга компонентов
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Отрисовка хедера
const pageHeader = document.querySelector(`.page-header`);
const tripControls = pageHeader.querySelector(`.trip-controls`);
const tripInfo = pageHeader.querySelector(`.trip-info`);

render(tripInfo, createTripInfoTemplate(), `beforebegin`);
render(tripControls, createMenuTemplate(), `beforeend`);
render(tripControls, createFiltersTemplate(), `beforeend`);

// ОТРИСОВКА MAIN
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

// Сортировка событий
render(tripEvents, createSortEventsTemplate(), `beforeend`);

// форма создания или редактирования события
render(tripEvents, createEventFormTemplate(), `beforeend`);

// Список дней (<ul class="trip-days"></ul>)
render(tripEvents, createTripsDayTemplate(), `beforeend`);

// Список дней (<li class="trip-days__item  day"><li>)
const tripDays = pageMain.querySelector(`.trip-days`);
render(tripDays, createDaysTemplate(), `beforeend`);

// Информация о дне <div class="day__info">...</div>
const day = pageMain.querySelector(`.day`);
render(day, createDaysInfoTemplate(), `beforeend`);

// Шаблон списка событий дня
render(day, createEventsListTemplate(), `beforeend`);

// Добавление карточек событий
const tripEventList = pageMain.querySelector(`.trip-events__list`);
render(tripEventList, cardTemplates, `beforeend`);
