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
 * @fileoverview Common regex patterns
 * @author Gabriel Womble
 */

/**
 * Matches number or float
 */
const REGEX_FLOAT = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/gm;

/**
 * Matches Int
 */
const REGEX_INT = /[0-9]/g;

/**
 * Matches whitespace
 */
const REGEX_WHITESPACE = /\s/g;

/**
 * Matches for 1 capital, 1 lowercase, 1 digit, and one special char
 */
const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

/**
 * Matches numbers and letters only for an address
 */
const REGEX_ADDRESS = /^[a-z0-9]+$/i;

/**
 * Matches numbers, letters, and spaces
 */
const REGEX_INPUT = /^[a-z0-9 ]*$/i;

/**
 * Object containing regex patterns
 */
export const REGEXES = {
  REGEX_ADDRESS,
  REGEX_FLOAT,
  REGEX_INT,
  REGEX_INPUT,
  REGEX_PASSWORD,
  REGEX_WHITESPACE,
};
