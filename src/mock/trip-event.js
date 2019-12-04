// МОКИ ДЛЯ ТОЧЕК МАРШРУТА
import {EventTypes, Cities, PhotoId, Description, DescriptionSentenceNumber,
  Price, extraOptions, MONTH_NAMES} from '../const';

import {getRandomArrayItem, getRandomArray, getRandomIntegerNumber} from '../util';

// Время события

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getTime = (date) => {
  return ((date.getHours() < 10) ? (`0` + date.getHours()) : (date.getHours()))
  + `:` + ((date.getMinutes() < 10) ? (`0` + date.getMinutes()) : (date.getMinutes()));
};

const getDay = (date) => {
  return ((date.getDate() < 10) ? (`0` + date.getDate()) : (date.getDate()));
};

const getMonth = (date) => {
  return date.getMonth();
};

const generateEventPhotos = (count) => {
  const photos = [];

  new Array(count)
    .fill(``)
    .forEach(() => {
      photos.push(`http://picsum.photos/300/150?r=${Math.random(PhotoId.MAX, PhotoId.MIN)}`);
    });

  return photos;
};

const generateExtraServices = (options) => {
  const result = new Set();

  if (Math.random() >= 0.5) {
    for (let i = 0; i <= getRandomIntegerNumber(0, 2); i++) {
      result.add(getRandomArrayItem(options));
    }
  }

  return result;
};

// Функция генерации событий
const generateEvent = () => {
  let dateStart = getRandomDate(new Date(2019, 1, 1), new Date(2020, 12, 31));
  let dateFinish = getRandomDate(dateStart, new Date(2020, 12, 31));
  let timeStart = getTime(dateStart);
  let timeFinish = getTime(dateFinish);
  return {
    type: getRandomArrayItem(EventTypes),
    city: getRandomArrayItem(Cities),
    photos: generateEventPhotos(getRandomIntegerNumber(2, 7)),
    description: getRandomArray(Description, DescriptionSentenceNumber.MIN, DescriptionSentenceNumber.MAX),
    price: getRandomIntegerNumber(Price.MIN, Price.MAX),
    dateStart,
    dateFinish,
    timeStart,
    timeFinish,
    diffTime: new Date(Math.round(dateStart / 1000)) - (Math.round(dateFinish / 1000)),
    day: getDay(dateStart),
    month: MONTH_NAMES[getMonth(dateStart)],
    extraServices: generateExtraServices(extraOptions),
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
