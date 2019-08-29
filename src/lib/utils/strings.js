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

export {
  safeString,
};