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

export const MY_WALLETS = defineMessages({
  ADD_WALLET_BUTTON_LABEL: {
    id: 'plugin.my_wallets.add_wallet_button_label',
    description: 'Add wallet button label',
    defaultMessage: 'Add Wallet',
  },
  ADDRESSES_DELETION_NON_ZERO_ERROR_MESSAGE: {
    id: 'plugin.my_wallets.addresses_deletion_non_zero_error_message',
    description: 'Message to display when unable to delete selected address because of balance',
    defaultMessage: 'Cannot delete an address that contains a non-zero balance',
  },
  ADDRESSES_DELETION_SINGLE_ADDRESS_ERROR_MESSAGE: {
    id: 'plugin.my_wallets.addresses_deletion_single_address_error_message',
    description: 'Message to display when unable to delete selected address because there is only on address left',
    defaultMessage: 'A wallet must contain at least one address',
  },
  ADDRESSES_LABEL: {
    id: 'plugin.my_wallets.addresses_label',
    description: 'Addresses label',
    defaultMessage: 'Addresses',
  },
  ALL_ADDRESS_TEXT: {
    id: 'plugin.my_wallets.all_address_text',
    description: 'All addresses text',
    defaultMessage: 'All Addresses',
  },
  CONFIRM_RECOVERY_CODE_LABEL: {
    id: 'plugin.my_wallets.confirm_recovery_code_label',
    description: 'confirm recovery code label text',
    defaultMessage: 'Confirm Recovery Code',
  },
  CONFIRM_RECOVERY_PROMPT: {
    id: 'plugin.my_wallets.confirm_recovery_prompt',
    description: 'confirm recovery code prompt',
    defaultMessage: 'Click the words from your recovery code in the right order to confirm',
  },
  CONTINUE_BUTTON: {
    id: 'plugin.my_wallets.continue_button',
    description: 'continue button text',
    defaultMessage: 'Continue',
  },
  CURRENT_BALANCE_LABEL: {
    id: 'plugin.my_wallets.current_balance',
    description: 'current balance text',
    defaultMessage: 'Current Balance',
  },
  DESCRIPTION_LABEL: {
    id: 'plugin.my_wallets.description_label',
    description: 'Description label text',
    defaultMessage: 'Description',
  },
  GENERATE_CODE_BUTTON: {
    id: 'plugin.my_wallets.generate_code_button',
    description: 'generate code button text',
    defaultMessage: 'Generate Code',
  },
  KEEP_SECRET_TEXT: {
    id: 'plugin.my_wallets.keep_secret_text',
    description: 'keep secret text',
    defaultMessage: `*Please ensure you write this
    down and keep it safe incase you need to recover your wallet.
    You will not be able to do so without it. Make sure no one is looking before
    you generate a code.`,
  },
  MANAGE_WALLET_BUTTON_LABEL: {
    id: 'plugin.my_wallets.manage_wallet_button_label',
    description: 'Manage button text',
    defaultMessage: 'Manage',
  },
  MANAGE_WALLET_PANEL_LABEL: {
    id: 'plugin.my_wallets.manage_wallet_panel_label',
    description: 'Manage wallet panel text',
    defaultMessage: 'Manage Wallet',
  },
  MANAGE_WALLET_ADD_ADDRESS: {
    id: 'plugin.my_wallets.manage_wallet_add_address',
    description: 'Manage wallet add address text',
    defaultMessage: 'Add Address',
  },
  MANAGE_WALLET_ADDRESS_NICKNAME: {
    id: 'plugin.my_wallets.manage_address_nickname',
    description: 'Manage wallet address nickname text',
    defaultMessage: 'Address Nickname',
  },
  MANAGE_WALLET_DELETE_ADDRESS: {
    id: 'plugin.my_wallets.manage_wallet_delete_address',
    description: 'Manage wallet delete address text',
    defaultMessage: 'Delete Address',
  },
  MANAGE_WALLET_REFRESH_ADDRESS: {
    id: 'plugin.my_wallets.manage_wallet_refresh_address',
    description: 'Manage wallet refresh address text',
    defaultMessage: 'Refresh Address',
  },
  NEW_WALLET_TEXT: {
    id: 'plugin.my_wallets.new_wallet_title',
    description: 'new wallet text to used in various places',
    defaultMessage: `New Wallet`,
  },
  NEW_WALLET_DISCLAIMER: {
    id: 'plugin.my_wallets.new_wallet_disclaimer',
    description: 'new wallet disclaimer',
    defaultMessage: `You are responsible for you wallet and all recovery codes.
    We will not be able to reissue you a new code without the previous codes.
    Please take a moment to read and review our Terms of Service:`,
  },
  NEW_WALLET_DISCLAIMER_LABEL: {
    id: 'plugin.my_wallets.new_wallet_disclaimer_label',
    description: 'new wallet disclaimer label',
    defaultMessage: `Disclaimer`,
  },
  NEW_WALLET_SUB_TITLE: {
    id: 'plugin.my_wallets.new_wallet_sub_title',
    description: 'new wallet sub title',
    defaultMessage: `Step {currentStep} of 3`,
  },
  NAV_ITEM: {
    id: 'plugin.my_wallets.nav_item',
    description: 'Nav item label for My Wallets page',
    defaultMessage: 'My Wallets',
  },
  NO_TRANSACTIONS_TEXT: {
    id: 'plugin.my_wallets.no_transactions_text',
    description: 'Text to display when no transactions are available',
    defaultMessage: 'No Transactions Available',
  },
  MULTI_ADDRESS_LABEL: {
    id: 'plugin.my_wallets.multi_address_label',
    description: 'label for multi address question',
    defaultMessage: 'Is this a multi-address wallet?',
  },
  PAGE_HEADER: {
    id: 'plugin.my_wallets.page_header',
    description: 'My Wallets Page Header',
    defaultMessage: 'My Wallets',
  },
  RECEIVE_FUNDS_BUTTON_LABEL: {
    id: 'plugin.my_wallets.receive_button_label',
    description: 'Receive button label',
    defaultMessage: 'Receive funds',
  },
  RECOVERY_CODE_LABEL: {
    id: 'plugin.my_wallets.recovery_code_label',
    description: 'recovery code button text',
    defaultMessage: 'Recovery Code',
  },
  SEARCH: {
    id: 'plugin.transactions.search',
    description: 'Search component placeholder text',
    defaultMessage: 'Search Transactions...',
  },
  SEND_FUNDS_BUTTON_LABEL: {
    id: 'plugin.my_wallets.send_funds_button_label',
    description: 'Send button label',
    defaultMessage: 'Send funds',
  },
  TERMS_AND_CONDITIONS_LABEL: {
    id: 'plugin.my_wallets.terms_and_conditions_label',
    description: 'label for terms and conditions checkbox',
    defaultMessage: 'I have read and agree to the Terms of Service',
  },
  TERMS_AND_CONDITIONS_PT1: {
    id: 'plugin.my_wallets.terms_and_conditions_pt1',
    description: 'text for terms and conditions',
    defaultMessage: `These terms of service (“Terms of Service”) govern your use of John Wiley & Sons, Inc. and its subsidiaries’ (“Wiley”) websites, services and applications (the “Services”). By using or accessing the Services, you agree to be bound by these Terms of Service, as updated from time to time in accordance with Section 12 below. There may be instances when we offer additional terms specific to a product, application or service. To the extent such additional terms conflict with these Terms of Service, the additional terms associated with the product, application or service, with respect to your use of the product, application or service, will prevail. References to “us,” “we,” and “our” mean John Wiley & Sons, Inc.`,
  },
  TERMS_AND_CONDITIONS_PT2: {
    id: 'plugin.my_wallets.terms_and_conditions_pt2',
    description: 'text for terms and conditions',
    defaultMessage: `Some Services may allow you to:{br}
    Add your own original content or post your content in blog or user comment areas (“Your Content”). Remember that all information that is disclosed in blog, comment or other public areas becomes public information and you should exercise caution when deciding to share any of your personal information as part of Your Content{br}
    
    Use the Services as modified with Your Content{br}
    
    Arrange for third parties to have access to Your Content subject to these Terms of Service`,
  },
  TERMS_AND_CONDITIONS_SECTION_TITLE: {
    id: 'plugin.my_wallets.terms_and_conditions_section_title',
    description: 'text for terms and conditions',
    defaultMessage: `1. USING THE SERVICES`,
  },
  WALLET_NICKNAME_LABEL: {
    id: 'plugin.my_wallets.wallet_nickname_label',
    description: 'Wallet Nickname label',
    defaultMessage: 'Wallet Nickname',
  },
});
