// МОКИ ДЛЯ ТОЧЕК МАРШРУТА
import {EVENT_TYPES} from '../constants';

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
  name: `[destination name]`,
  description: `[destination description]`,
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
const Time = {
  MINUTE: 60000,
};

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
    type: getRandomArrayItem(EVENT_TYPES),
    dateFromUnix: dateFrom,
    dateToUnix: dateTo,
    destination: getRandomDestination(),
    picture: getRandomPicture(),
    basePrice: getRandomIntegerNumber(100, 1000),
    offers: getRandomArrayLength(0, 3).map(getRandomOffer),
    isFavorite: getRandomBoolean(),
  };
};

export const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export const generateTripDays = (cards) => {
  let tripDays = [];
  let currentCards = [];

  cards.forEach((card, i) => {
    let prevCard = i > 0 ? cards[i - 1] : null;

    if (prevCard && card.dateFromUnix.getDate() !== prevCard.dateFromUnix.getDate()) {
      tripDays.push(currentCards);
      currentCards = [];
    }
    currentCards.push(card);
    if (i === cards.length - 1) {
      tripDays.push(currentCards);
    }
  });

  return tripDays;
};

export const getTripInfoCost = (tripDays) => {
  const eventCards = tripDays.flat();
  let tripInfoCost = eventCards.reduce((sum, eventCard) => {
    return sum + eventCard.basePrice;
  }, 0);
  return tripInfoCost;
};
