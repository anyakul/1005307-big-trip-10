const makeTemplateGenerator = (generator) => {
  const reduceValues = (template, value, index) => {
    template += generator(value, index);
    return template;
  };

  return (values) => values.reduce(reduceValues, ``);
};

export {makeTemplateGenerator};
