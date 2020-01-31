const emojis = new Map([
  [`ship`, `\u{1f6a2}`],
  [`flight`, `\u{2708}`],
  [`bus`, `\u{1f68c}`],
  [`train`, `\u{1f686}`],
  [`ship`, `\u{1f6f3}`],
  [`restaurant`, `\u{1f374}`],
  [`check-in`, `\u{1f3e8}`],
  [`sightseeing`, `\u{1f3db}`],
  [`transport`, `\u{1f698}`],
  [`drive`, `\u{1f697}`],
  [`taxi`, `\u{1f695}`],
]);

const formatTypeWithEmoji = (type) => `${emojis.get(type)} ${type}`;

export {formatTypeWithEmoji};
