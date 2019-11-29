// Функция получения рандомного числа
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

// Функция получения рандомного элемента из массива
export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

// Функция получения массива из нескольких элементов из другого массива
export const getRandomArray = (array, min, max) => {

  return array
    .filter(() => Math.random() > 0.5)
    .slice(min, max);
};
