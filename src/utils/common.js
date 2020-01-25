import moment from 'moment';

const isSameDay = (firstDate, secondDate) => {
  return moment(firstDate).isSame(secondDate, `day`) && moment(firstDate).isSame(secondDate, `month`) && moment(firstDate).isSame(secondDate, `year`);
};

export {isSameDay};

const getDatesDiff = (a, b) => {
  return moment(a) - moment(b);
};

export const calculateDurationFromMs = (mseconds) => {

  const diffDuration = moment.duration(mseconds);

  let duration = ``;

  if (diffDuration.days() !== 0) {
    duration += `${diffDuration.days()}D `;
  }

  if (diffDuration.hours() !== 0) {
    duration += `${diffDuration.hours()}H `;
  }

  if (diffDuration.minutes() !== 0) {
    duration += `${diffDuration.minutes()}M`;
  }

  return duration;
};
