const getTypeName = (type) => type[0].toUpperCase() + type.slice(1);

const createTypes = (checkedType, array) => Object.values(array)
  .map((type) => ({
    type,
    name: getTypeName(type),
    isChecked: type === checkedType,
  }));

export {createTypes};
