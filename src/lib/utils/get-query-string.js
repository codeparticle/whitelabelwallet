const getQueryString = function(paramKeys) {
  let queryString = '?';

  Object.keys(paramKeys).forEach((key) => {
    queryString += `${key}=${paramKeys[key]}&`;
  });

  return queryString.slice(0, queryString.length - 1);
};

export { getQueryString };
