import { WalletManager } from 'api';

/**
 * Function to get a addresses from db by wallet ID
 * @param {number} id - id of wallet to get
 */
async function getAddressesByWalletId(id) {
  const res = await WalletManager.getAddressesByWalletId(id);
  return res;
}

const buildWalletChart = async (id) => {
  const walletAddresses = await getAddressesByWalletId(id);
  console.log('========\n', 'walletAddresses', walletAddresses, '\n========');
};

export { buildWalletChart };