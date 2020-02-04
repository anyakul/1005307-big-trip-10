import {TRANSFER_EVENTS, ACTIVITY_EVENTS} from '../const';

const Preposition = {
  TRANSPORT: `to`,
  PLACE: `in`,
};

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const createPreposition = (types, preposition) =>
  types.map((type) => [type, `${capitalize(type)} ${preposition}`]);

const prepositionTypes = new Map([
  ...createPreposition(TRANSFER_EVENTS, Preposition.TRANSPORT),
  ...createPreposition(ACTIVITY_EVENTS, Preposition.PLACE),
]);

const formatTypeWithPreposition = (type) =>
  prepositionTypes.get(type) || ``

export {formatTypeWithPreposition}
