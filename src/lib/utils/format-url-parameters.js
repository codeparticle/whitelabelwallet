
const formatUrlParameters = function(paramsString, delimiter) {
  const formattedParams = {};
  const paramsArray = paramsString.split(delimiter);

  for (let i = 0; i < paramsArray.length; i++) {
    const keyValuePairArray = paramsArray[i].split('=');
    formattedParams[keyValuePairArray[0]] = keyValuePairArray[1];
  }
  return formattedParams;
};

export { formatUrlParameters };
