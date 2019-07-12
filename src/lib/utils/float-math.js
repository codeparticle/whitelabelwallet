const getDecimalPrecision = (n) => {
  const parts = n.toString().split('.');

  if (parts.length < 2) {
    return 0;
  }

  return parts[1].length;
};

// establishes a max for the number of decimal places in a float
const setMaxPrecision = (n, precision = 8) => {
  return parseFloat(n.toFixed(precision));
};

const add = (...numbers) => {
  const precisions = numbers.map(n => getDecimalPrecision(n));
  const precision = Math.max(...precisions);

  const sum = numbers.reduce((a, b) => (a + b), 0);

  return parseFloat(sum.toFixed(precision));
};

const subtract = (...numbers) => {
  const charged = numbers.map((n, i) => {

    if (i === 0) {
      return n;
    }

    return -(n);
  });

  return add(...charged);
};


export {
  setMaxPrecision,
  add,
  subtract,
};
