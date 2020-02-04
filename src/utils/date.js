import moment, {duration} from 'moment';

const formatTimeValue = ([format, value]) =>
  `${String(value).padStart(2, `0`)}${format}`;

const getDatesDiff = (firstDate, secondDate) => {
  return moment(firstDate) - moment(secondDate);
};
const formatDurationTime = (durations) =>
  Object.entries(durations)
    .map(formatTimeValue)
    .join(` `);

const getDuration = (ms) => {
  const {days: D, hours: H, minutes: M} = duration(ms)._data;

  if (D > 0) {
    return {D, H, M};
  }
  if (H > 0) {
    return {H, M};
  }

  return M > 0 ? {M} : ``;
};

const isSameDay = (firstDate, secondDate) => {
  return moment(firstDate).isSame(secondDate, `day`) && moment(firstDate).isSame(secondDate, `month`) && moment(firstDate).isSame(secondDate, `year`);
};

const formatDuration = (ms) => formatDurationTime(getDuration(ms));
const formatTime = (date) => moment(date).format(`HH:mm`);
const formatDate = (date) => moment(date).format(`DD:MM:YY`);
const formatDateTime = (date) => moment(date).format(`DD/MM/YY HH:mm`);

const formatMonthDay = (date) => moment(date).format(`MMM DD`);

export {
  formatDate,
  formatDateTime,
  formatDuration,
  formatTime,
  formatMonthDay,
  isSameDay,
  getDuration,
  getDatesDiff,
};
