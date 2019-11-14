/**
 * Calculates amount to send
 * @param {Object[]} outputs
 * @param {number} fee
 */
export function getSatoshisToSend(outputs, fee) {
  return outputs.reduce((total, output) => {
    return total + output.satoshis;
  }, 0) + fee;
}
