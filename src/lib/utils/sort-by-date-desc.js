function sortListByDate (data) {
  const sortedTransactions = data.sort(function(date1, date2) {
    if (date1.created_date > date2.created_date) {
      return -1
      ;
    };
    if (date1.created_date < date2.created_date) {
      return 1;
    }
    return 0;
  });

  return sortedTransactions;
}

export { sortListByDate };