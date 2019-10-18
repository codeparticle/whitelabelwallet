/**
 * @fileoverview Common regex patterns
 * @author Gabriel Womble
 */

/**
 * Matches number or float
 */
const REGEX_FLOAT = /^([1-9]\d*(\.|\,)\d*|0?(\.|\,)\d*[1-9]\d*|[1-9]\d*)$/gm;

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
  REGEX_INPUT,
  REGEX_PASSWORD,
  REGEX_WHITESPACE,
};
