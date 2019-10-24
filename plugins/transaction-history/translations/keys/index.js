import { defineMessages } from 'react-intl';

export const TRANSACTION_HISTORY = defineMessages({
  COMPLETE_LABEL: {
    id: 'plugin.transaction_details.complete_label',
    description: 'complete label',
    defaultMessage: `Complete`,
  },
  NAV_ITEM: {
    id: 'plugin.transaction_history.nav_item',
    description: 'Nav item label for Transaction History page',
    defaultMessage: 'Transaction History',
  },
  TRANSACTION_DETAILS_TITLE: {
    id: 'plugin.transaction_history.transaction_details',
    description: 'Title for transaction details header',
    defaultMessage: 'Transaction Details',
  },
  TRANSACTION_DETAILS_BUTTON: {
    id: 'plugin.transaction_history.transaction_button',
    description: 'Text for transaction details button',
    defaultMessage: 'OK',
  },
});
