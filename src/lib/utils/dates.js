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
import moment from 'moment';
import { DATE_OPTIONS, GENERAL } from 'lib/constants';
import { COMMON } from 'translations/keys/common';

const { TIMESTAMP_FORMAT } = GENERAL;

const {
  TODAY,
  WEEK,
  MONTH,
  YEAR,
} = DATE_OPTIONS;

const {
  DATE_OPTION_TODAY,
  DATE_OPTION_WEEK,
  DATE_OPTION_MONTH,
  DATE_OPTION_YEAR,
  DATE_OPTION_ALL_TIME,
} = COMMON;

/**
 * Formats a timestamp from the given value. If no value is passed, timestamp is the current time
 * @returns {String} formatted timestamp
 * @param {String|undefined} val optional date to format to timestamp
 */
function getTimestamp(val = undefined) {
  return moment(val).format(TIMESTAMP_FORMAT);
}

const getSelectOptions = (formatMessage, getDateValue) => {
  return [
    { value: getDateValue(TODAY), label: formatMessage(DATE_OPTION_TODAY) },
    { value: getDateValue(WEEK), label: formatMessage(DATE_OPTION_WEEK) },
    { value: getDateValue(MONTH), label: formatMessage(DATE_OPTION_MONTH) },
    { value: getDateValue(YEAR), label: formatMessage(DATE_OPTION_YEAR) },
    { value: getDateValue(), label: formatMessage(DATE_OPTION_ALL_TIME) },
  ];
};

export { getSelectOptions, getTimestamp };