import { defineMessages } from 'react-intl';

export const SEND_FUNDS = defineMessages({
  TITLE: {
    id: 'plugin.send_funds.title',
    description: 'Send Funds page title and nav link label',
    defaultMessage: 'Send Funds',
  },
  WALLET: {
    id: 'plugin.send_funds.wallet',
    description: 'Generic Wallet text',
    defaultMessage: 'Wallet',
  },
  BALANCE: {
    id: 'plugin.send_funds.balance',
    description: 'Generic Balance text',
    defaultMessage: 'Balance',
  },
  SEND_TO: {
    id: 'plugin.send_funds.send_to',
    description: 'Send to text',
    defaultMessage: 'Send to:',
  },
  SEND_FROM: {
    id: 'plugin.send_funds.send_from',
    description: 'Send from text',
    defaultMessage: 'Send from:',
  },
  TRANSFER_AMOUNT: {
    id: 'plugin.send_funds.transfer_amount',
    description: 'Transfer amount label text',
    defaultMessage: 'Transfer Amount',
  },
  MEMO: {
    id: 'plugin.send_funds.memo',
    description: 'Memo label text',
    defaultMessage: 'Memo',
  },
  SAVED_RECIPIENT: {
    id: 'plugin.send_funds.saved_recipient',
    description: 'Saved recipient label text',
    defaultMessage: 'Saved Recipient',
  },
  RAW_ADDRESS: {
    id: 'plugin.send_funds.raw_address',
    description: 'Raw address label text',
    defaultMessage: 'Raw Address',
  },
  SEND_TO_PLACEHOLDER: {
    id: 'plugin.send_funds.send_to_placeholder',
    description: 'Placeholder text for send funds send to search',
    defaultMessage: 'Search or enter address...',
  },
  CONFIRM_SEND_TO: {
    id: 'plugin.send_funds.confirm_send_to',
    description: 'Formatted message for send funds footer',
    defaultMessage: 'Confirm transfer of G {amount} to {address}?',
  },
});
