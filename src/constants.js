// Тип точки маршрута
export const EVENT_TYPES = [
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

export const menu = [
  `table`,
  `stats`
];

export const filters = [
  `Everything`,
  `Futute`,
  `Past`
];

// Словарь типов событий и предлогов
export const eventTypeToPreposition = {
  'Taxi': 'to',
  'Bus': 'to',
  'Train': 'to',
  'Ship': 'to',
  'Transport': 'to',
  'Drive': 'to',
  'Flight': 'to',
  'Check-in': 'to',
  'Sightseeing': 'at',
  'Restaurant': 'in'
};
