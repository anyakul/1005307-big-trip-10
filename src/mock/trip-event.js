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
  `Check-in`,
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

// Время начала
const timesStart = [
  `10.00`,
  `11.00`,
  `12.00`,
  `13.00`
];

// Время окончания
const timesFinish = [
  `15.00`,
  `16.00`,
  `17.00`,
  `18.00`
];

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

// время события

const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getTime = (date) => {
  return ((date.getHours() < 10) ? (`0` + date.getHours()) : (date.getHours())) 
  + ":" + ((date.getMinutes() < 10) ? (`0` + date.getMinutes()) : (date.getMinutes())) 
}

const getDay = (date) => {
  return (date.getDate());// + ":" + date.getMonth());
}

// Функция генерации событий
const generateEvent = () => {
  let dateStart = getRandomDate(new Date(2019, 1, 1), new Date(2020, 12, 31));
  let dateFinish = getRandomDate(dateStart, new Date(2020, 12, 31));
  let timeStart = getTime(dateStart);
  let timeFinish = getTime(dateFinish);
  let diff = new Date(+(dateStart - dateFinish));
  return {
    type: getRandomArrayItem(EventTypes),
    city: getRandomArrayItem(Cities),
    photo: `http://picsum.photos/300/150?r=${getRandomIntegerNumber(PhotoId.MIN, PhotoId.MAX)}`,
    description: getRandomArray(Description, DescriptionSentenceNumber.MIN, DescriptionSentenceNumber.MAX),
    price: getRandomIntegerNumber(Price.MIN, Price.MAX),
    dateStart: dateStart,
    dateFinish: dateFinish,
    timeStart,
    timeFinish,
   // diffTime: getTime(diff),
    day: getDay(dateStart),
   // diff = diff ,
   // addOptionType: getRandomArray(additionalOptions, AdditionalOptionsNumber.MIN, AdditionalOptionsNumber.MAX),
  };
};

const generateEvents = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent);
};

export {generateEvent, generateEvents};
