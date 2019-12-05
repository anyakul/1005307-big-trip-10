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
    for (let i = 0; i <= getRandomIntegerNumber(0, 3); i++) {
      result.add(getRandomArrayItem(options));
    }
  }

  return result;
};

// Функция генерации событий
const generateEvent = () => {
  let dateFrom = getRandomDate(new Date(2019, 1, 1), new Date(2020, 12, 31));
  let dateTo = getRandomDate(dateFrom, new Date(2020, 12, 31));
  let timeFrom = getTime(dateFrom);
  let timeTo = getTime(dateTo);

  return {
    type: getRandomArrayItem(EventTypes),
    dateFrom,
    dateTo,
    day: getDay(dateFrom),
    month: MONTH_NAMES[getMonth(dateFrom)],
    timeFrom,
    timeTo,
    diffTime: new Date(Math.round(dateFrom / 1000)) - (Math.round(dateTo / 1000)),
    destination: {
      name: getRandomArrayItem(Cities),
      description: getRandomArray(Description, DescriptionSentenceNumber.MIN, DescriptionSentenceNumber.MAX),
      pictures: [
        {
          src: generateEventPhotos(getRandomIntegerNumber(2, 7)),
          description: getRandomArray(Description, DescriptionSentenceNumber.MIN),
        },
      ]
    },
    basePrice: getRandomIntegerNumber(Price.MIN, Price.MAX),
    offers: generateExtraServices(extraOptions),
  };
};


const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvents};
