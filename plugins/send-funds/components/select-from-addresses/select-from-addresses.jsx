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
import { getFromAddress, getPreSelectedFromAddress } from 'plugins/send-funds/rdx/selectors';
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
  preSelectedFromAddress,
  setFormSelecting,
  ...props
}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [addressName, setAddressName] = useState('');

  useEffect(() => {
    if (preSelectedFromAddress) {
      const { data: { addresses } } = preSelectedFromAddress;

      if (addresses.length === 1) {
        props.setFromAddress(preSelectedFromAddress.data.addresses[0].address);
      } else {
        onClick();
      }
    }
  }, [preSelectedFromAddress]);

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
          setToState={props.setFromAddress}
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
  preSelectedFromAddress: PropTypes.object,
  setFormSelecting: PropTypes.func.isRequired,
  setFromAddress: PropTypes.func.isRequired,
};

SelectFromAddressesView.defaultProps = {
  preSelectedFromAddress: null,
};

const mapStateToProps = state => {
  const fromAddress = getFromAddress(state);
  const preSelectedFromAddress = getPreSelectedFromAddress(state);

  return {
    fromAddress,
    preSelectedFromAddress,
  };
};

const mapDispatchToProps = {
  setFromAddress,
};

export const SelectFromAddresses = connect(mapStateToProps, mapDispatchToProps)(SelectFromAddressesView);
