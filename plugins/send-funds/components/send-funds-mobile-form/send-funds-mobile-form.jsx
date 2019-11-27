/**
 * @fileoverview Mobile form layout for sending funds
 * @author Gabriel Womble
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Visible } from '@codeparticle/react-visible';
import { TextArea } from '@codeparticle/whitelabelwallet.styleguide';
import { BackButton } from 'components';
import { useUnmount } from 'lib/hooks';
import { ADDRESSES, ROUTES } from 'lib/constants';
import { TRANSLATION_KEYS } from 'translations/keys';

import { SelectFromAddresses, SelectFromContacts } from 'plugins/send-funds/components';
import { constants } from 'plugins/send-funds/helpers';
import { preSelectFromAddress, setToAddress } from 'plugins/send-funds/rdx/actions';
import { getToAddress } from 'plugins/send-funds/rdx/selectors';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import './send-funds-mobile-form.scss';

const { MY_WALLETS } = ROUTES;
const { COMMON: { DESCRIPTION } } = TRANSLATION_KEYS;
const { ADDRESS_MIN_LENGTH } = ADDRESSES;
const {
  WRITE_SOMETHING,
} = SEND_FUNDS;
const { SELECTING_ADDRESSES, SELECTING_CONTACTS } = constants;

function SendFundsMobileFormView({
  formatMessage,
  history,
  match,
  memo,
  setMemo,
  toAddress,
  updateHeaderProps,
  ...props
}) {
  const [address, setAddress] = useState('');
  const [formSelecting, setFormSelecting] = useState(false);
  const isFromMyWallets = match.path.includes(MY_WALLETS);

  function BackArrow(props) {
    const onClick = () => {
      history.goBack();
    };

    return <BackButton onClick={onClick} {...props} />;
  }

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

    setMemo(e.target.value);
  }

  useEffect(() => {
    if (isFromMyWallets) {
      updateHeaderProps({
        NavigationButton: BackArrow,
      });
    }
  }, [isFromMyWallets]);

  // Reset button on unMount in case of screen resize
  useUnmount(() => {
    updateHeaderProps();
    props.preSelectFromAddress();
  });

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
          className="send-funds-mobile-form__text-area"
          label={formatMessage(DESCRIPTION)}
          onChange={onTextAreaChange}
          placeholder={formatMessage(WRITE_SOMETHING)}
          value={memo}
        />
      </Visible>
    </div>
  );
}

SendFundsMobileFormView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  memo: PropTypes.string.isRequired,
  preSelectFromAddress: PropTypes.func.isRequired,
  setMemo: PropTypes.func.isRequired,
  setToAddress: PropTypes.func.isRequired,
  toAddress: PropTypes.string.isRequired,
  updateHeaderProps: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const toAddress = getToAddress(state);

  return {
    toAddress,
  };
};

const mapDispatchToProps = {
  preSelectFromAddress,
  setToAddress,
};

export const SendFundsMobileForm = connect(mapStateToProps, mapDispatchToProps)(withRouter(SendFundsMobileFormView));
