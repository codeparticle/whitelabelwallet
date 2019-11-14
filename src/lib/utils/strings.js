/**
 * @fileoverview Utils related to string interaction
 * @author Gabriel Womble
 */
import SqlString from 'sqlstring-sqlite';

/**
 * Function that escapes characters in a string
 * so that they'll be safe to pass to the databaseManager
 * @param {string} str - the string to be escaped
 */
const safeString = (str) => {
  // .slice is needed to remove single quotes that
  // wrap str after SqlString.escape is returned
  return SqlString.escape(str).slice(1, -1);
};

/**
 * Function that 'un-escapes' a string from the db.
 * @returns {string} Un-escaped string
 * @param {string} str string to be un-escaped
 */
const unescape = (str) => {
  return str.replace(/\'\'/g, '\'');
};

/**
 * Function that turns a message or messageKey into an error object
 * @returns {Object} errorObject
 * @param {String} message The key for the message
 */
const asErrorObject = message => ({ error: { message } });


export {
  asErrorObject,
  unescape,
  safeString,
};