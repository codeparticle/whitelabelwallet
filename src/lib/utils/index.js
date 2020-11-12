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
import { arrayToRegex } from './array-to-regex';
import { asyncForEach } from './async-for-each';
import {
  currencyConverter,
  floatToSatoshi,
  satoshiToFloat,
  SATOSHI_FACTOR,
} from './currency-converter';
import { getSelectOptions, getTimestamp } from './dates';
import { empty } from './empty';
import { environment } from './environment';
import { floatMath } from './float-math';
import { formatFloat } from './format-float';
import { formatUrlParameters } from './format-url-parameters';
import { getLowercaseKeys } from './get-lowercase-keys';
import { getQueryString } from './get-query-string';
import { getUrlParameterByName } from './get-url-parameter-by-name';
import { isRequestAllowed } from './is-request-allowed';
import { getSidepanelVariant } from './layout';
import { mapInputErrors } from './map-input-errors';
import { preSelectedIsMultiAddress } from './objects';
import { regexToString } from './regex-to-string';
import { asErrorObject, safeString, unescape } from './strings';
import { sortListByDate } from './sort-by-date-desc';
import { getFiatAmount } from './get-fiat-amount';
import { getCurrencyFormat } from './get-currency-format';
import { getChartPoints } from './get-chart-points';

export {
  arrayToRegex,
  asErrorObject,
  asyncForEach,
  currencyConverter,
  empty,
  environment,
  floatMath,
  floatToSatoshi,
  formatFloat,
  formatUrlParameters,
  getChartPoints,
  getCurrencyFormat,
  getFiatAmount,
  getLowercaseKeys,
  getQueryString,
  getSelectOptions,
  getSidepanelVariant,
  getTimestamp,
  getUrlParameterByName,
  isRequestAllowed,
  mapInputErrors,
  preSelectedIsMultiAddress,
  regexToString,
  safeString,
  SATOSHI_FACTOR,
  satoshiToFloat,
  sortListByDate,
  unescape,
};
