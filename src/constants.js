// Тип точки маршрута
export const EVENT_TYPES = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
  `Checkin`,
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
  Taxi: `to`,
  Bus: `to`,
  Train: `to`,
  Ship: `to`,
  Transport: `to`,
  Drive: `to`,
  Flight: `to`,
  Checkin: `into`,
  Sightseeing: `at`,
  Restaurant: `in`
};
