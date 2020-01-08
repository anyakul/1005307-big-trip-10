const KeyboardKey = {
  ENTER: `Enter`,
  ESCAPE: `Esc`,
  ESCAPE_IE: `Escape`,
};

export const isEscKey = ({key}) => {
  return key === KeyboardKey.ESCAPE
    || key === KeyboardKey.ESCAPE_IE;
};
