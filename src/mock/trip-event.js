// МОКИ ДЛЯ ТОЧЕК МАРШРУТА

// Тип точки маршрута
const EventTypes = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Check`,
  `Sightseeing`,
  `Restaurant`
];


// Города
const Cities = [
  `Rome`,
  `Madrid`,
  `Lisbon`,
  `Paris`,
  `Venice`,
];

const PhotoId = {
  MIN: 1,
  MAX: 100
};

// Описание
const Description = [
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
  `In rutrum ac purus sit amet tempus.`
];

const DescriptionSentenceNumber = {
  MIN: 1,
  MAX: 3
};

// Цена
const Price = {
  MIN: 1,
  MAX: 1000,
};

// Дополнительные опции
const additionalOptions = [
  {
    type: `Add`,
    name: `luggage`,
    price: `10 €`,
  },
  {
    type: `Switch to`,
    name: `comfort class`,
    price: `+150 €`,
  },
  {
    type: `Add`,
    name: `meal`,
    price: `+2 €`,
  },
  {
    type: `Choose`,
    name: `seats`,
    price: `+9 €`
  }
];

const AdditionalOptionsNumber = {
  MIN: 0,
  MAX: 2
};

import {getRandomArrayItem} from '../util';
import {getRandomArray} from '../util';
import {getRandomIntegerNumber} from '../util';

// Функция создания случайной даты
const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

// Функция генерации событий
const generateEvent = () => {
  return {
    eventType: getRandomArrayItem(EventTypes),
    city: getRandomArrayItem(Cities),
    photo: `http://picsum.photos/300/150?r=${getRandomIntegerNumber(PhotoId.MIN, PhotoId.MAX)}`,
    description: getRandomArray(Description, DescriptionSentenceNumber.MIN, DescriptionSentenceNumber.MAX),
    price: getRandomIntegerNumber(Price.MIN, Price.MAX),
    date: getRandomDate(),
    addOption: getRandomArray(additionalOptions, AdditionalOptionsNumber.MIN, AdditionalOptionsNumber.MAX),
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
