// МОКИ ДЛЯ ТОЧЕК МАРШРУТА
import {EVENT_TYPES} from '../constants';

const CARD_COUNT = 5;

const Time = {
  MINUTE: 60000,
};

const CITIES = [
  `London`,
  `Moscow`,
  `Paris`,
  `Bangkok`
];

const DestinationDescriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

// Функция получения рандомного числа
const getRandomIntegerNumber = (min = 0, max = 9) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция получения рандомного элемента из массива
const getRandomArrayItem = (array) => {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};

// Функция получения массива рандомной длины
const getRandomArrayLength = (min = 0, max = 9) => {
  return new Array(getRandomIntegerNumber(min, max)).fill(null);
};

// функции получения фотографий
const getRandomPhoto = () => {
  return `http://picsum.photos/300/150?r=${Math.random()}`;
};

const getRandomPicture = () => ({
  src: getRandomPhoto(),
  description: `Event photo`,
});

// Функция получения направления
const getRandomDestination = () => ({
  name: getRandomArrayItem(CITIES),
  description: getRandomArrayItem(DestinationDescriptions),
  pictures: getRandomArrayLength(0, 5).map(getRandomPicture),
});

// функция получения рандомного булевого значения
const getRandomBoolean = (chance = 0.5) => {
  return Math.random() > chance;
};

// Фунуция получения предложений
const getRandomOffer = () => ({
  title: `Offer title`,
  price: getRandomIntegerNumber(80, 200),
  accepted: getRandomBoolean(),
});

// Функция получения времени
const makeEventDatesGenerator = ({Y, M, D}) => {
  let dateStart = Date.UTC(Y, M, D);
  return (minutes) => ({
    dateFrom: dateStart,
    dateTo: (dateStart = +dateStart + Time.MINUTE * minutes),
  });
};

const getEventDates = makeEventDatesGenerator({Y: 2019, M: 12, D: 7});

// Функция генерации событий
const generateEvent = () => {
  const {dateFrom, dateTo} = getEventDates(getRandomIntegerNumber(30, 60 * 32));
  return {
    id: String(new Date() + Math.random()),
    type: getRandomArrayItem(EVENT_TYPES),
    dateFrom,
    dateTo,
    destination: getRandomDestination(),
    picture: getRandomPicture(),
    basePrice: getRandomIntegerNumber(100, 1000),
    offers: getRandomArrayLength(0, 3).map(getRandomOffer),
    isFavorite: getRandomBoolean(),
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export const events = generateEvents(CARD_COUNT);
