const makeTemplateGenerator = (generator) => {
  const reduceValues = (template, value) => {
    template += generator(value);
    return template;
  };

  return (values) => values.reduce(reduceValues, ``);
};

export {makeTemplateGenerator};
