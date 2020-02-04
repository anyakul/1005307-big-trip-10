import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

const defaultConfig = {
  [`altFormat`]: `d/m/y H:m`,
  [`altInput`]: true,
  [`dateFormat`]: `Z`,
  [`enableTime`]: true,
  [`time_24hr`]: true,
};

const createFlatpickr = (element, config = {}) =>
  flatpickr(element, Object.assign({}, defaultConfig, config));

export {createFlatpickr};
