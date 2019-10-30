const currencyConverter = function(amount, rate, toFixed = 2) {
  return (parseFloat(amount) * parseFloat(rate)).toFixed(toFixed);
};

const SATOSHI_FACTOR = Math.pow(10000, 2);

const satoshiToFloat = amt => amt / SATOSHI_FACTOR;
const floatToSatoshi = amt => amt * SATOSHI_FACTOR;

export {
  currencyConverter,
  floatToSatoshi,
  satoshiToFloat,
  SATOSHI_FACTOR,
};