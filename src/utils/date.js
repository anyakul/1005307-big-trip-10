import moment from "moment";

const generateTimeInterval = (dateStart, dateEnd) => {
  const timeDiff = moment(dateEnd).diff(moment(dateStart));
  let daysDiff = moment.utc(timeDiff).format(`DD`);
  let hoursDiff = moment.utc(timeDiff).format(`HH`);
  let minutesDiff = moment.utc(timeDiff).format(`mm`);

  let formattedInterval = daysDiff > 0 ? castDateInterval(daysDiff) : ``;
  if (daysDiff > 0 || hoursDiff > 0) {
    formattedInterval += ` ${castHoursInterval(hoursDiff)}`;
  }
  return formattedInterval + ` ${castMinutesInterval(minutesDiff)}`;
};

const castDateInterval = (days) => {
  return `${days}D`;
};

const castHoursInterval = (hours) => {
  return `${hours}H`;
};

const castMinutesInterval = (minutes) => {
  return `${minutes}M`;
};

const castTimeFormat = (date) => {
  return moment(date).format(`HH:mm`);
};

const castFullDateFormat = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

const castDateFormat = (date) => {
  return moment(date).format(`DD:MM:YY`);
};

const castMonthDayFormat = (date) => {
  return moment(date).format(`MMM DD`);
};

export {
  generateTimeInterval,
  castDateInterval,
  castHoursInterval,
  castMinutesInterval,
  castTimeFormat,
  castFullDateFormat,
  castDateFormat,
  castMonthDayFormat
};
