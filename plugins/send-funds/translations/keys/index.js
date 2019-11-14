import { defineMessages } from 'react-intl';

export const SEND_FUNDS = defineMessages({
  BALANCE: {
    id: 'plugin.send_funds.balance',
    description: 'Generic Balance text',
    defaultMessage: 'Balance',
  },
  CONFIRM_SEND_TO: {
    id: 'plugin.send_funds.confirm_send_to',
    description: 'Formatted message for send funds footer',
    defaultMessage: 'Confirm transfer of G {amount} to {address}?',
  },
  ENTER_ADDRESS: {
    id: 'plugin.send_funds.enter_address',
    description: 'Enter address placeholder text',
    defaultMessage: 'Enter Address',
  },
  INVALID_ADDRESS: {
    id: 'plugins.send_funds.invalid_address',
    description: 'Invalid address text',
    defaultMessage: 'Alert! {address} is not a valid address.',
  },
  MEMO: {
    id: 'plugin.send_funds.memo',
    description: 'Memo label text',
    defaultMessage: 'Memo',
  },
  NUM_ADDRESSES: {
    id: 'plugin.send_funds.num_addresses',
    description: 'Number of addresses text',
    defaultMessage: '{addressCount, plural, one {# Address} other {# Addresses}}',
  },
  QR_INSTRUCTIONS: {
    id: 'plugin.send_funds.qr_instructions',
    description: 'Instructional text for qr scanner',
    defaultMessage: 'Align the recipient\'s QR code within the bounds to automatically fill in transaction details.',
  },
  RAW_ADDRESS: {
    id: 'plugin.send_funds.raw_address',
    description: 'Raw address label text',
    defaultMessage: 'Raw Address',
  },
  SAVED_RECIPIENT: {
    id: 'plugin.send_funds.saved_recipient',
    description: 'Saved recipient label text',
    defaultMessage: 'Saved Recipient',
  },
  SCAN_QR_CODE: {
    id: 'plugin.send_funds.scan_qr_code',
    description: 'Scan qr code text',
    defaultMessage: 'Scan QR Code',
  },
  SELECT_ADDRESS: {
    id: 'plugin.send_funds.select_address',
    description: 'Select address text',
    defaultMessage: 'Select Address',
  },
  SELECT_CONTACT: {
    id: 'plugin.send_funds.select_contact',
    description: 'Select contact text',
    defaultMessage: 'Select Contact:',
  },
  SELECT_FROM_CONTACTS: {
    id: 'plugin.send_funds.select_from_contacts',
    description: 'Select from contacts text',
    defaultMessage: 'Select from Contacts',
  },
  SEND_FROM: {
    id: 'plugin.send_funds.send_from',
    description: 'Send from text',
    defaultMessage: 'Send from:',
  },
  SEND_TO: {
    id: 'plugin.send_funds.send_to',
    description: 'Send to text',
    defaultMessage: 'Send to:',
  },
  SEND_TO_PLACEHOLDER: {
    id: 'plugin.send_funds.send_to_placeholder',
    description: 'Placeholder text for send funds send to search',
    defaultMessage: 'Search or enter address...',
  },
  SEND_SUCCESSFUL: {
    id: 'plugin.send_funds.send_successful',
    description: 'Message for successful send transaction',
    defaultMessage: 'Success! G {amount} has been sent to {formattedName}',
  },
  SUCCESS_HEADER: {
    id: 'plugin.send_funds.success_header',
    description: 'Success header message',
    defaultMessage: 'Success!',
  },
  TITLE: {
    id: 'plugin.send_funds.title',
    description: 'Send Funds page title and nav link label',
    defaultMessage: 'Send Funds',
  },
  TRANSFER_AMOUNT: {
    id: 'plugin.send_funds.transfer_amount',
    description: 'Transfer amount label text',
    defaultMessage: 'Transfer Amount',
  },
  VIEW_ON_BLOCKCHAIN: {
    id: 'plugin.send_funds.view_on_blockchain',
    description: 'View on Blockchain text',
    defaultMessage: 'View On Blockchain',
  },
  WALLET: {
    id: 'plugin.send_funds.wallet',
    description: 'Generic Wallet text',
    defaultMessage: 'Wallet',
  },
  WRITE_SOMETHING: {
    id: 'plugin.send_funds.write_something',
    description: 'Write something placeholder text',
    defaultMessage: 'Write something...',
  },
});
