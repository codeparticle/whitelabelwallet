
import axios from 'axios';
import { environment } from './environment';

const { coinApiKey, coin, fiat } =  environment;
const URL = `https://rest.coinapi.io/v1/exchangerate/${coin.toUpperCase()}/${fiat.toUpperCase()}`;
const config = {
  headers: { 'X-CoinAPI-Key': coinApiKey },
};


const getFiatAmount = async (amountToConvert = 0) => {
  const { rate = 0 } = (await axios.get(URL, config)).data;
  return {
    amount: (amountToConvert * rate).toFixed(2),
    rate,
  };
};

export { getFiatAmount };