import { environment } from './environment';
/* eslint-disable no-control-regex */

// Check for whitespace in username or password
const hasWhiteSpace = (value) => {
  return /\s/g.test(value);
};

// Checks for 1 uppercase, 1 lowercase, 1 digit, 1 special char
const validFormat = (value) => {
  const format = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
  return format.test(value);
};

const handlePasswords = (password, confirm) => {
  let errorCode;
  if (password && password.length < 8) {
    errorCode = 1;
  } else if (hasWhiteSpace(password)) {
    errorCode = 2;
  } else if (!validFormat(password)) {
    errorCode = 3;
  } else if (!confirm) {
    errorCode = 4;
  } else if (password !== confirm) {
    errorCode = 5;
  } else {
    errorCode = null;
  }
  errorCode = (environment.isDev() && password == confirm) ? null : errorCode;
  const isValidPassword = !errorCode;

  return { isValidPassword, errorCode };
};

export {
  hasWhiteSpace,
  validFormat,
  handlePasswords,
};