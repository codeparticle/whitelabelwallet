/**
 * @fileoverview Select from addresses mobile view
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Visible } from '@codeparticle/react-visible';
import { TextInput } from '@codeparticle/whitelabelwallet.styleguide';

import { setFromAddress } from 'plugins/send-funds/rdx/actions';
import { getFromAddress } from 'plugins/send-funds/rdx/selectors';
import { MobileFormButton, SelectAddresses } from 'plugins/send-funds/components';
import { constants, getFormattedAddressName } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';

import './select-from-addresses.scss';

const { SELECTING_ADDRESSES } = constants;
const {
  SELECT_ADDRESS,
  SEND_FROM,
} = SEND_FUNDS;

function SelectFromAddressesView({
  formatMessage,
  fromAddress,
  setFormSelecting,
  ...props
}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [addressName, setAddressName] = useState('');

  function onClick() {
    setIsSelecting(true);
    setFormSelecting(SELECTING_ADDRESSES);
  }

  useEffect(() => {
    if (!fromAddress) {
      setAddressName('');
    } else {
      getFormattedAddressName(setAddressName, fromAddress);
    }
  }, [fromAddress]);

  return (
    <Visible
      when={!isSelecting}
      fallback={
        <SelectAddresses
          formatMessage={formatMessage}
          setFormSelecting={setFormSelecting}
          setFromAddress={props.setFromAddress}
          setIsSelecting={setIsSelecting}
        />
      }
    >
      <MobileFormButton
        btnLabel={formatMessage(SELECT_ADDRESS)}
        label={formatMessage(SEND_FROM)}
        onClick={onClick}
        input={
          <Visible when={Boolean(addressName)}>
            <div className="select-from-addresses-input">
              <TextInput disabled value={addressName} />
            </div>
          </Visible>
        }
      />
    </Visible>
  );
}

SelectFromAddressesView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  fromAddress: PropTypes.string.isRequired,
  setFormSelecting: PropTypes.func.isRequired,
  setFromAddress: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const fromAddress = getFromAddress(state);

  return {
    fromAddress,
  };
};

const mapDispatchToProps = {
  setFromAddress,
};

export const SelectFromAddresses = connect(mapStateToProps, mapDispatchToProps)(SelectFromAddressesView);
