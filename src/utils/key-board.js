const KeyboardKey = {
  ESCAPE: `Esc`,
  ESCAPE_IE: `Escape`,
};

const isEscKey = ({key}) =>
  key === KeyboardKey.ESCAPE ||
  key === KeyboardKey.ESCAPE_IE;

export {isEscKey};
