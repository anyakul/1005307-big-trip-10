import moment from 'moment';

const isSameDay = (firstDate, secondDate) => {
  return moment(firstDate).isSame(secondDate, `day`) && moment(firstDate).isSame(secondDate, `month`) && moment(firstDate).isSame(secondDate, `year`);
};

export {isSameDay};
