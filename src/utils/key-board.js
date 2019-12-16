const KeyboardKey = {
  ENTER: `Enter`,
  ESCAPE: `Esc`,
  ESCAPE_IE: `Escape`,
};

export const isEscKey = (evt) => {
  return evt.key === KeyboardKey.ESCAPE
    || evt.key === KeyboardKey.ESCAPE_IE;
};
