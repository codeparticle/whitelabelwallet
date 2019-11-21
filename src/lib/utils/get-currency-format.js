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