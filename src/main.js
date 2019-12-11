import {RenderPosition, render} from './utils';

// ХЕДЕР

// Информация о городах поездки
import TripInfoComponent from './components/trip-info';

// Фильтры
import {generateFiltersPoints} from './mock/filters';
import FiltersComponent from './components/filters-form';

// Меню
import SiteMenuComponent from './components/menu';
import {generateMenuPoints} from './mock/menu';

// MAIN
import TripDaysListComponent from './components/trip-days-list';
import DayComponent from './components/day';

// Сортировка
import SortComponent from './components/sort-events';

// Информация о дне
import DayInfoComponent from './components/day-info';

// События дня
import TripEventsListComponent from './components/events-list';
import EventCardComponent from './components/event-card';
import {getTripInfoCost, generateTripDays, generateEvents} from './mock/trip-event';

// Форма редактирования события
import EventFormComponent from './components/event-form';

// Генерация событий дня
const CARD_COUNT = 5;
const cards = generateEvents(CARD_COUNT);
cards.sort((a, b) => Date.parse(a.startDate) > Date.parse(b.startDate) ? 1 : -1);
const tripDays = generateTripDays(cards);

// ОТРИСОВКА ХЕДЕРА
const pageHeader = document.querySelector(`.page-header`);
const tripControls = pageHeader.querySelector(`.trip-controls`);
const tripInfo = pageHeader.querySelector(`.trip-info`);
const tripInfoCost = pageHeader.querySelector(`.trip-info__cost-value`);
const TRIP_COUNT = 2;
const FILTERS_COUNT = 2;
const MENU_COUNT = 2;

// Информация о стоимости поездки
tripInfoCost.textContent = getTripInfoCost(tripDays);

console.log(getTripInfoCost(tripDays));
console.log(tripDays);
console.log(cards);

// Информация о городах поездки
cards.slice(1, TRIP_COUNT).forEach((eventItem) => render(tripInfo, new TripInfoComponent(eventItem).getElement(), RenderPosition.BEFOREEND));

// Фильтры
const filters = generateFiltersPoints(FILTERS_COUNT);
filters.slice(1, FILTERS_COUNT).forEach((filtersItem) => render(tripControls, new FiltersComponent(filtersItem).getElement(), RenderPosition.BEFOREEND));

// Меню
const menu = generateMenuPoints(MENU_COUNT);
menu.slice(1, MENU_COUNT).forEach((menuItem) => render(tripControls, new SiteMenuComponent(menuItem).getElement(), RenderPosition.BEFOREEND));

// ОТРИСОВКА MAIN
const pageMain = document.querySelector(`.page-main`);
const tripEvents = pageMain.querySelector(`.trip-events`);

render(tripEvents, new TripDaysListComponent().getElement(), RenderPosition.BEFOREEND);
const tripDaysList = pageMain.querySelector(`.trip-days`);
render(tripDaysList, new DayComponent().getElement(), RenderPosition.BEFOREEND);

const day = pageMain.querySelector(`.day`);

// Список событий дня
render(day, new TripEventsListComponent().getElement(), RenderPosition.BEFOREEND);

// форма редактирования события и карточки событий
const tripEventList = pageMain.querySelector(`.trip-events__list`);

const renderEvent = (card) => {
  const eventComponent = new EventCardComponent(card);
  const eventEditComponent = new EventFormComponent(card);

  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    tripEventList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  });

  const editForm = eventEditComponent.getElement();
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    tripEventList.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  });

  render(tripEventList, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

cards.slice(0, CARD_COUNT).forEach(renderEvent);

// Информация о дне
const EVENT_COUNT = 2;
cards.slice(1, EVENT_COUNT).forEach((eventItem) => render(day, new DayInfoComponent(eventItem).getElement(), RenderPosition.BEFOREEND));

// Сортировка событий
render(tripEvents, new SortComponent().getElement(), RenderPosition.AFTERBEGIN);
