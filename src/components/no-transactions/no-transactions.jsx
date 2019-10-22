import React from 'react';
import PropTypes from 'prop-types';
import {
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';

import { COMMON } from 'translations/keys/common';

const { NO_TRANSACTIONS_TEXT } = COMMON;

const NoTransactions = ({ formatMessage }) => {
  const { isMobile } = useMedia();

  return (
    <div className={`empty-list ${isMobile ? 'hide' : ''}`}>
      <h1>{formatMessage(NO_TRANSACTIONS_TEXT)}</h1>
    </div>
  );
};

NoTransactions.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

export { NoTransactions };