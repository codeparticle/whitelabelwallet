/**
 * @fileoverview Address List for Receive Funds
 * @author Gabriel Womble
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fontSizeXS3 } from '@codeparticle/whitelabelwallet.styleguide/styles/fonts.scss';

import { setAddress } from 'plugins/receive-funds/rdx/actions';
import { RECEIVE_FUNDS } from 'plugins/receive-funds/translations/keys';
import { FromAddressList } from 'plugins/send-funds/components';

const { SELECT_WALLET } = RECEIVE_FUNDS;

function ReceiveFundsAddressListView({
  formatMessage,
  ...props
}) {
  return (
    <Fragment>
      <FromAddressList
        formatMessage={formatMessage}
        onClick={props.setAddress}
        searchLabel={formatMessage(SELECT_WALLET)}
      />
      <style jsx>
        {`
          :global(.send-funds-search h4) {
            font-size: ${fontSizeXS3} !important;
          }
        `}
      </style>
    </Fragment>
  );
}

ReceiveFundsAddressListView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAddress,
};

const ReceiveFundsAddressList = connect(null, mapDispatchToProps)(ReceiveFundsAddressListView);

export { ReceiveFundsAddressList };
