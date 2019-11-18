
import axios from 'axios';
import { environment } from './environment';

console.log('========\n', 'environment', environment, '\n========');
const { coinApiKey, coin, fiat } =  environment;
const URL = `https://rest.coinapi.io/v1/exchangerate/${coin.toUpperCase()}/${fiat.toUpperCase()}`;
console.log('========\n', 'URL', URL, '\n========');
const config = {
  headers: { 'X-CoinAPI-Key': coinApiKey },
};


const getExchangeRate = async () => {
  console.log('========\n', 'getting exchange rate', '\n========');
  return await axios.get(URL, config);
};

export { getExchangeRate };