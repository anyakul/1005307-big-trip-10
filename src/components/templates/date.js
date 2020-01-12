import {duration} from 'moment';

const calcDuration = (start, end) => duration(window.moment(end).diff(start))._data;
const formatTimeValue = ([format, value]) => `${String(value).padStart(2, `0`)}${format}`;
const formatDurationTime = (durations) => Object.entries(durations).map(formatTimeValue).join(` `);

const formatDuration = (start, end) => {
  const {days: D, hours: H, minutes: M} = calcDuration(start, end);

  if (D > 0) {
    return formatDurationTime({D, H, M});
  }
  if (H > 0) {
    return formatDurationTime({H, M});
  }

  return formatDurationTime({M});
};

const formatTime = (date) => {
  return window.moment(date).format(`HH:mm`);
};

const formatFullDate = (date) => {
  return window.moment(date).format(`DD/MM/YY HH:mm`);
};

const formatDate = (date) => {
  return window.moment(date).format(`DD:MM:YY`);
};

const formatMonthDay = (date) => {
  return window.moment(date).format(`MMM DD`);
};

export {
  formatDuration,
  formatTime,
  formatFullDate,
  formatDate,
  formatMonthDay
};
