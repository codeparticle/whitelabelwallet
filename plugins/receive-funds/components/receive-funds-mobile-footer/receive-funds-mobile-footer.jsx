/**
 * @fileoverview Mobile Footer for Receive Funds Page
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';

import { ReceiveFundsMobileActions, RequestAmount } from 'plugins/receive-funds/components';
import './receive-funds-mobile-footer.scss';

function ReceiveFundsMobileFooter({
  formatMessage,
  notMobileOrNotHidden,
}) {
  return (
    <div className="receive-funds-mobile-footer">
      <Visible when={notMobileOrNotHidden}>
        <RequestAmount formatMessage={formatMessage} />
        <ReceiveFundsMobileActions formatMessage={formatMessage} />
      </Visible>
    </div>
  );
};

ReceiveFundsMobileFooter.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  notMobileOrNotHidden: PropTypes.bool.isRequired,
};

export { ReceiveFundsMobileFooter };
