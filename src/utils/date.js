const months = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

// Функция конвертации даты
export const showTime = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  const hour = (date.getHours() < 10) ? (`0` + date.getHours()) : (date.getHours());
  const min = (date.getMinutes() < 10) ? (`0` + date.getMinutes()) : (date.getMinutes());
  return hour + `:` + min;
};

// Функция конвертации даты
export const showDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  return day + ` ` + month;
};

// Функция конвертации даты
export const showDateWithYear = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return day + `/` + month + `/` + year;
};

// Функция конвертации даты
export const showFullDate = (unixTimestamp) => {
  const date = showDate(unixTimestamp);
  const time = showTime(unixTimestamp);
  return date + ` ` + time;
};
