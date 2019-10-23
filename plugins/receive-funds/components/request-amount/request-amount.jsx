/**
 * @fileoverview RequestAmount input for receive funds
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TextInput } from '@codeparticle/whitelabelwallet.styleguide';
import { REGEXES } from 'lib/constants';

import { setAmount } from 'plugins/receive-funds/rdx/actions';
import { getAmount } from 'plugins/receive-funds/rdx/selectors';
import { RECEIVE_FUNDS } from 'plugins/receive-funds/translations/keys';
import './request-amount.scss';

const { REGEX_FLOAT } = REGEXES;
const { REQUEST_AMOUNT } = RECEIVE_FUNDS;

function RequestAmountView({ amount, formatMessage, ...props }) {
  const [value, setValue] = useState(amount);
  function handleChange(e) {
    e.preventDefault();

    const { value: val } = e.target;

    if (val.match(REGEX_FLOAT) || val === '') {
      setValue(val);
    }
  };

  useEffect(() => {
    props.setAmount(value);
  }, [value]);

  useEffect(() => {
    if (amount !== value) {
      setValue(amount);
    }
  }, [amount]);

  return (
    <TextInput
      className="receive-funds-request-amount"
      label={formatMessage(REQUEST_AMOUNT)}
      onChange={handleChange}
      value={value}
    />
  );
};

RequestAmountView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAmount,
};

const mapStateToProps = state => {
  const amount = getAmount(state);

  return {
    amount,
  };
};

const RequestAmount = connect(mapStateToProps, mapDispatchToProps)(RequestAmountView);

export { RequestAmount };
