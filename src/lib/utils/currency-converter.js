const currencyConverter = function(amount, rate, toFixed = 2) {
  return (parseFloat(amount) * parseFloat(rate)).toFixed(toFixed);
};

export { currencyConverter };