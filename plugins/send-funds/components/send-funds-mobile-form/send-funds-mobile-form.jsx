/**
 * @fileoverview Mobile form layout for sending funds
 * @author Gabriel Womble
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Visible } from '@codeparticle/react-visible';
import { TextArea } from '@codeparticle/whitelabelwallet.styleguide';
import { ADDRESSES } from 'lib/constants';
import { TRANSLATION_KEYS } from 'translations/keys';

import { SelectFromAddresses, SelectFromContacts } from 'plugins/send-funds/components';
import { constants } from 'plugins/send-funds/helpers';
import { setToAddress } from 'plugins/send-funds/rdx/actions';
import { getToAddress } from 'plugins/send-funds/rdx/selectors';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import './send-funds-mobile-form.scss';

const { COMMON: { DESCRIPTION } } = TRANSLATION_KEYS;
const { ADDRESS_MIN_LENGTH } = ADDRESSES;
const {
  WRITE_SOMETHING,
} = SEND_FUNDS;
const { SELECTING_ADDRESSES, SELECTING_CONTACTS } = constants;

function SendFundsMobileFormView({
  formatMessage,
  toAddress,
  transferFields,
  setTransferFields,
  ...props
}) {
  const [address, setAddress] = useState('');
  const [formSelecting, setFormSelecting] = useState(false);

  const notSelectingType = type => type !== formSelecting;

  function onAddressInputchange(e) {
    e.preventDefault();
    setAddress(e.target.value);

    if (e.target.value < ADDRESS_MIN_LENGTH && toAddress !== '') {
      props.setToAddress('');
    }
  }

  function onTextAreaChange(e) {
    e.preventDefault();

    setTransferFields({
      ...transferFields,
      memo: e.target.value,
    });
  }

  useEffect(() => {
    if (toAddress !== address) {
      setAddress(toAddress);
    }
  }, [toAddress]);

  useEffect(() => {
    if (address.length >= ADDRESS_MIN_LENGTH) {
      props.setToAddress(address);
    }
  }, [address]);

  return (
    <div className="send-funds-mobile-form">
      <Visible when={notSelectingType(SELECTING_CONTACTS)}>
        <SelectFromAddresses
          formatMessage={formatMessage}
          setFormSelecting={setFormSelecting}
        />
      </Visible>
      <Visible when={notSelectingType(SELECTING_ADDRESSES)}>
        <SelectFromContacts
          formatMessage={formatMessage}
          inputValue={address}
          onInputChange={onAddressInputchange}
          setFormSelecting={setFormSelecting}
        />
      </Visible>
      <Visible when={!formSelecting}>
        <TextArea
          label={formatMessage(DESCRIPTION)}
          onChange={onTextAreaChange}
          placeholder={formatMessage(WRITE_SOMETHING)}
          value={transferFields.memo}
        />
      </Visible>
    </div>
  );
}

SendFundsMobileFormView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  setToAddress: PropTypes.func.isRequired,
  setTransferFields: PropTypes.func.isRequired,
  toAddress: PropTypes.string.isRequired,
  transferFields: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  const toAddress = getToAddress(state);

  return {
    toAddress,
  };
};

const mapDispatchToProps = {
  setToAddress,
};

export const SendFundsMobileForm = connect(mapStateToProps, mapDispatchToProps)(SendFundsMobileFormView);
