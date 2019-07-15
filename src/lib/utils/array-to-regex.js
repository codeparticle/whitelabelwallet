function arrayToRegex (values) {
  return new RegExp(`^(${values.join('|')})`);
};

export {
  arrayToRegex,
};
