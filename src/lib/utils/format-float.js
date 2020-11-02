/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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
