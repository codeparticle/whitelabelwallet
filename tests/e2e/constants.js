function getDataSelector (selector) {
  return {
    attr: `[data-selector="${selector}"]`,
    raw: selector,
  };
}

export const routes = {
  base: 'http://localhost:8080/',
};

export const main = {
  selectors: {
    test: getDataSelector('test'),
  },
};
