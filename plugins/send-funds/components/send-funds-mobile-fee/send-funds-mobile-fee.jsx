import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { TextInput } from '@codeparticle/whitelabelwallet.styleguide';
import { REGEXES } from 'lib/constants';

import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import './send-funds-mobile-fee.scss';

const {
  FEE_MESSAGE,
  TRANSACTION_FEE,
} = SEND_FUNDS;

const { REGEX_INT } = REGEXES;

function SendFundsMobileFeeView({
  fee,
  intl,
  setFee,
}) {
  const { formatMessage } = intl;

  function onChange(e) {
    e.preventDefault();

    const { value } = e.target;

    if (REGEX_INT.test(value) || !value) {
      setFee(value);
    }
  }

  return (
    <div className="send-funds-mobile-fee">
      <TextInput
        label={formatMessage(TRANSACTION_FEE)}
        value={fee}
        onChange={onChange}
      />
      <p className="send-funds-mobile-fee__message">
        {formatMessage(FEE_MESSAGE)}
      </p>
    </div>
  );
}

SendFundsMobileFeeView.propTypes = {
  fee: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  setFee: PropTypes.func.isRequired,
};

export const SendFundsMobileFee = injectIntl(SendFundsMobileFeeView);
