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
const fiatSymbols = {
  'usd': '\u0024',
  'pound': '\u00A3',
  'euro': '\u20AC',
  'yen': '\u00A5',
  'indianRupee': '\u20B9',
  'ruble': '\u20BD',
  'colon': '\u20A1',
  'cruzeiro': '\u20A2',
  'frenchFranc': '\u20A3',
  'lira': '\u20A4',
  'mill': '\u20A5',
  'naira': '\u20A6',
  'peseta': '\u20A7',
  'rupee': '\u20A8',
  'won': '\u20A9',
  'newSheqel': '\u20AA',
  'dong': '\u20AB',
  'kip': '\u20AD',
  'tugrik': '\u20AE',
  'drachma': '\u20AF',
  'peso': '\u20B1',
  'guarani': '\u20B2',
  'austral': '\u20B3',
  'hryvnia': '\u20B4',
  'cedi': '\u20B5',
  'livreTournois': '\u20B6',
  'tenge': '\u20B8',
  'turkishLira': '\u20BA',
  'manat': '\u20BC',
  'bengaliRupee': '\u09F3',
  'gujaratiRupee': '\u0AF1',
  'tamilRupee': '\u0BF9',
  'rial': '\uFDFC',
};

function getCurrencyFormat(fiat, amount = 0) {
  const symbol = fiatSymbols[fiat];

  return {
    format: `${symbol} ${amount}`,
    symbol,
  };
};

export { getCurrencyFormat };