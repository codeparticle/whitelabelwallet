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
 * @fileoverview Blockchain Related messages
 * @author Gabriel Womble
 */
import { defineMessages } from 'react-intl';
import { ERRORS } from 'lib/constants';

const {
  BLOCKCHAIN: {
    API_ERROR,
    BROADCAST_ERROR,
    INSUFFICIENT_FUNDS,
  },
} = ERRORS;

export const BLOCKCHAIN = defineMessages({
  [API_ERROR]: {
    id: 'blockchain.api-error',
    description: 'Generic blockchain api error message',
    defaultMessage: 'An error occurred while contacting the blockchain.',
  },
  [BROADCAST_ERROR]: {
    id: 'blockchain.broadcast-error',
    description: 'Generic tx broadcast error message',
    defaultMessage: 'An error occurred when broadcasting your transaction.',
  },
  [INSUFFICIENT_FUNDS]: {
    id: 'blockchain.insufficient-funds',
    description: 'Insufficient funds error message',
    defaultMessage: 'Insufficient funds error: Please try adjusting the fee or lowering the amount to send.',
  },
});
