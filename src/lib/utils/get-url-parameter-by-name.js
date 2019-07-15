const getUrlParameterByName = (name) => {
  const params = location.search.slice(1);
  const splitParams = params.split('&');
  const paramsObj = {};

  splitParams.forEach((param) => {
    const splitParam = param.split('=');

    paramsObj[splitParam[0]] = splitParam[1];
  });

  return paramsObj[name];
};

export { getUrlParameterByName };