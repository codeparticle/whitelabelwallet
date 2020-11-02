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
import { defineMessages } from 'react-intl';

export const RECEIVE_FUNDS = defineMessages({
  COPY_ADDRESS: {
    id: 'plugin.receive_funds.copy_address',
    description: 'Copy Address text',
    defaultMessage: 'Copy Address',
  },
  COPY_RAW: {
    id: 'plugin.receive_funds.copy_raw',
    description: 'Copy Raw Address Text',
    defaultMessage: 'Copy Raw Address',
  },
  EMAIL_BODY: {
    id: 'plugin.receive_funds.email_body',
    description: 'Email body text',
    defaultMessage: `{hasAmount, select,
      true {Amount Requested: {amount}. Recipient's Address: "{address}".}
      other {Recipient's Address: "{address}".}
    }`,
  },
  EMAIL_SUBJECT: {
    id: 'plugin.receive_funds.email_subject',
    description: 'Email Subject text',
    defaultMessage: 'Coinbase: Request to transfer funds',
  },
  EMAIL_QR: {
    id: 'plugin.receive_funds.email_qr',
    description: 'Email QR Text',
    defaultMessage: 'Email QR Code',
  },
  ENTER_AMOUNT: {
    id: 'plugin.receive_funds.enter_amount',
    description: 'Enter Amount text',
    defaultMessage: 'Enter Amount',
  },
  QR_SENDER_INSTRUCTIONS: {
    id: 'plugin.receive_funds.qr_sender_instructions',
    description: 'Text that provides instructions for qr code',
    defaultMessage: 'Have the sender scan this code for easy transaction setup.',
  },
  QR_TITLE: {
    id: 'plugin.receive_funds.qr_title',
    description: 'Title for QR Code',
    defaultMessage: 'QR Code Generator',
  },
  REQUEST_AMOUNT: {
    id: 'plugin.receive_funds.request_amount',
    description: 'Request amount label',
    defaultMessage: 'Request Specific Amount',
  },
  REQUEST_QR_TEXT: {
    id: 'plugin.receive_funds.request_qr_text',
    description: 'Request amount qr text',
    defaultMessage: 'Request G {amount} to your address:',
  },
  SELECT_WALLET: {
    id: 'plugin.receive_funds.select_wallet',
    description: 'Label for selecting wallet on receive funds page',
    defaultMessage: 'Select Wallet',
  },
  SELECTED_ADDRESS: {
    id: 'plugin.receive_funds.selected_address',
    description: 'Selected Address text',
    defaultMessage: 'Selected Address:',
  },
  SHARE_ADDRESS: {
    id: 'plugin.receive_funds.share_address',
    description: 'Share Address text',
    defaultMessage: 'Share Address',
  },
  TITLE: {
    id: 'plugin.receive_funds.title',
    description: 'Nav item label for Receive Funds page',
    defaultMessage: 'Receive Funds',
  },
});
