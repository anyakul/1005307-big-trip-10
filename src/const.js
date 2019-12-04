// Тип точки маршрута
export const EventTypes = [
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
export const Cities = [
  `Rome`,
  `Madrid`,
  `Lisbon`,
  `Paris`,
  `Venice`,
];

export const PhotoId = {
  MIN: 1,
  MAX: 100
};

// Описание
export const Description = [
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

export const DescriptionSentenceNumber = {
  MIN: 1,
  MAX: 3
};

// Цена
export const Price = {
  MIN: 1,
  MAX: 1000,
};

// Дополнительные опции
export const extraOptions = [
  {
    type: `Add`,
    name: `luggage`,
    price: `10`,
  },
  {
    type: `Switch to`,
    name: `comfort class`,
    price: `150`,
  },
  {
    type: `Add`,
    name: `meal`,
    price: `2`,
  },
  {
    type: `Choose`,
    name: `seats`,
    price: `9`
  }
];

export const extraOptionsNumber = {
  MIN: 0,
  MAX: 2
};

export const menu = [
  `table`,
  `stats`
];

export const filters = [
  `Everything`,
  `Futute`,
  `Past`
];

export const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
