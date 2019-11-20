function getChartPoints(balance, transactions, transactionType, xAxisOffset = true) {

  const transactionPoints = [];
  let balanceAtTheTime = balance;

  for (let i = transactions.length - 1; i >= 0 ; i--) {
    let xAxis = i;

    if (xAxisOffset) {
      xAxis = i + 1;
    }

    const currentTransaction = transactions[i];

    if (currentTransaction.transaction_type === transactionType) {
      transactionPoints.push({ x: xAxis, y: balanceAtTheTime - currentTransaction.amount });
      balanceAtTheTime = balanceAtTheTime - currentTransaction.amount;
    } else {
      transactionPoints.push({ x: xAxis, y: balanceAtTheTime + currentTransaction.amount });
      balanceAtTheTime = balanceAtTheTime + currentTransaction.amount;
    }
  }

  return transactionPoints;
}

export { getChartPoints };