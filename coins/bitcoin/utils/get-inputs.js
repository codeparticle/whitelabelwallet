/**
 * Function that builds an array of inputs based on values
 * in unspentOutputs and the satoshisToSend
 * @returns {Object} { inputs, remainingSatoshis }
 * @param {Object[]} unspentOutputs
 * @param {number} satoshisToSend
 */
export function getInputs(unspentOutputs, satoshisToSend) {
  const inputs = [];
  let totalInputSatoshis = 0;

  for (let i = 0; i < unspentOutputs.length; i++) {
    const unspentOutput = unspentOutputs[i];

    totalInputSatoshis += unspentOutput.satoshis;
    inputs.push({
      txid: unspentOutput.txid,
      vout: unspentOutput.vout,
      scriptPubKey: unspentOutput.scriptPubKey,
    });

    if (totalInputSatoshis >= satoshisToSend) {
      break;
    }
  }

  const remainingSatoshis = totalInputSatoshis - satoshisToSend;

  return {
    inputs,
    remainingSatoshis,
  };
}