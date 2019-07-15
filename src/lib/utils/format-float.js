// ensures small floats will be formatted to decimal (not scientific notation)
// returns a string
const formatFloat = (number) => {
  const str = number.toString();

  // if not in scientific notation, return as string
  if (str.indexOf('e-') === -1) {
    return str;
  }

  const parts = str.split('e-');
  // subtract one from cnt because first mult of 1/10 is used to move decimal point over
  // e.g.1e-1 === .1 (0 zeroes) and 1e-2 === .01 (1 zero)
  const zeroCount = parseInt(parts[1]) - 1;
  const value = parts[0].replace(/\./g, '');

  let zeroes = '';

  for (let i = 0; i < zeroCount; i++) {
    zeroes += '0';
  }

  return `0.${zeroes}${value}`;
};

export { formatFloat };
