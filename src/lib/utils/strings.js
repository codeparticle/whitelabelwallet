/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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