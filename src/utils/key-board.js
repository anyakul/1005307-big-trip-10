const KeyboardKey = {
  ESCAPE: `Esc`,
  ESCAPE_IE: `Escape`,
};

export const isEscKey = ({key}) => 
  key === KeyboardKey.ESCAPE || 
  key === KeyboardKey.ESCAPE_IE;
