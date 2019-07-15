const regexToString = (regex) => {
  const regexString = regex.toString();

  return regexString.slice(1).slice(0, regexString.length - 2);
};

export { regexToString };
