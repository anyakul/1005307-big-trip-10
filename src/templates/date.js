import moment, {duration} from 'moment';

const hasTimeValue = ([, value]) => value > 0;
const formatTimeValue = ([format, value]) => `${String(value).padStart(2, `0`)}${format}`;
const calcDuration = (start, end) => duration(moment(end).diff(start))._data;

const formatDuration = (start, end) => {
  const {days: D, hours: H, minutes: M} = calcDuration(start, end);
  return Object.entries({D, H, M})
    .filter(hasTimeValue)
    .map(formatTimeValue)
    .join(` `);
};

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatFullDate = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

const formatDate = (date) => {
  return moment(date).format(`DD:MM:YY`);
};

const formatMonthDay = (date) => {
  return moment(date).format(`MMM DD`);
};

export {
  formatDuration,
  formatTime,
  formatFullDate,
  formatDate,
  formatMonthDay
};
