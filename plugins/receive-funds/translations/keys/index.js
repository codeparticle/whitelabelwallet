import { defineMessages } from 'react-intl';

export const RECEIVE_FUNDS = defineMessages({
  COPY_ADDRESS: {
    id: 'plugin.receive_funds.copy_address',
    description: 'Copy Address text',
    defaultMessage: 'Copy Address',
  },
  EMAIL_BODY: {
    id: 'plugin.receive_funds-email_body',
    description: 'Email body text',
    defaultMessage: `{hasAmount, select,
      true {Amount Requested: {amount}. Recipient's Address: "{address}".}
      other {Recipient's Address: "{address}".}
    }`,
  },
  EMAIL_SUBJECT: {
    id: 'plugin.receive_funds-email_subject',
    description: 'Email Subject text',
    defaultMessage: 'Coinbase: Request to transfer funds',
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
  TITLE: {
    id: 'plugin.receive_funds.title',
    description: 'Nav item label for Receive Funds page',
    defaultMessage: 'Receive Funds',
  },
});
