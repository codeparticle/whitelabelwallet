/**
 * @fileoverview Component that manages layout of the Receive Funds Page
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Visible } from '@codeparticle/react-visible';
import { useMedia } from '@codeparticle/whitelabelwallet.styleguide';
import { BackButton } from 'components';
import { ROUTES } from 'lib/constants';
import { preSelectedIsMultiAddress } from 'lib/utils';

import { preSelectReceiver, setAddress } from 'plugins/receive-funds/rdx/actions';
import { getPreSelectedReceiver } from 'plugins/receive-funds/rdx/selectors';
import {
  ReceiveFundsAddressList,
  ReceiveFundsFooter,
  ReceiveFundsMobileFooter,
  ReceiveFundsQRCode,
  ReceiveFundsSelectAddress,
  RequestAmount,
} from 'plugins/receive-funds/components';
import './receive-funds-layout.scss';

const { MY_WALLETS } = ROUTES;

/**
 * Handles Rendering of the Desktop View List, List Search, and Amount Input
 * @returns {Node} ListArea
 * @param {Function} formatMessage
 */
function ListArea({ formatMessage }) {
  const { isMobile } = useMedia();

  return (
    <Visible when={!isMobile}>
      <div className="receive-funds-layout__list">
        <RequestAmount formatMessage={formatMessage} />
        <ReceiveFundsAddressList formatMessage={formatMessage} />
      </div>
    </Visible>
  );
}

/**
 * Handles rendering of The QRArea for both desktop and mobile.
 * When mobile, displays an address list initially, and then the QR
 * @returns {Node} QRArea
 * @param {Function} formatMessage
 * @param {Boolean} notMobileOrNotHidden
 * @param {Function} setIsFormSelecting
 */
function QRArea({
  formatMessage,
  notMobileOrNotHidden,
  setIsFormSelecting,
}) {
  const { isMobile } = useMedia();

  return (
    <div className="receive-funds-layout__qr-code">
      <Visible
        when={notMobileOrNotHidden}
        fallback={
          <ReceiveFundsSelectAddress
            formatMessage={formatMessage}
            setIsFormSelecting={setIsFormSelecting}
          />
        }
      >
        <ReceiveFundsQRCode formatMessage={formatMessage} isMobile={isMobile} />
      </Visible>
    </div>
  );
}

/**
 * Handles rendering of the Footer section
 * @return {Node} FooterArea
 * @param {Function} formatMessage
 * @param {Boolean} notMobileOrNotHidden
 */
function FooterArea({
  formatMessage,
  notMobileOrNotHidden,
}) {
  const { isMobile } = useMedia();

  return (
    <div className="receive-funds-layout__footer">
      <Visible
        when={!isMobile}
        fallback={
          <ReceiveFundsMobileFooter
            formatMessage={formatMessage}
            notMobileOrNotHidden={notMobileOrNotHidden}
          />
        }
      >
        <ReceiveFundsFooter formatMessage={formatMessage} />
      </Visible>
    </div>
  );
}

function ReceiveFundsLayoutView({
  formatMessage,
  history,
  match,
  preSelectedReceiver,
  updateHeaderProps,
  ...props
}) {
  const [isFormSelecting, setIsFormSelecting] = useState(!preSelectedReceiver || preSelectedIsMultiAddress(preSelectedReceiver));
  const { isMobile } = useMedia();
  const notMobileOrNotHidden = !isMobile || !isFormSelecting;
  const isFromMyWallets = match.path.includes(MY_WALLETS);

  function MobileBackButton(btnProps) {
    const onBackClick = () => {
      if (isFromMyWallets && (isFormSelecting || (preSelectedReceiver && !preSelectedIsMultiAddress(preSelectedReceiver)))) {
        props.preSelectReceiver(null);
        history.goBack();
      } else {
        setIsFormSelecting(true);
      }
    };

    return <BackButton onClick={onBackClick} {...btnProps} />;
  }

  // Skip selecting from list if a preSelectedWallet exists and only contains one address
  useEffect(() => {
    if (isMobile && !isFormSelecting && preSelectedReceiver) {
      if (!preSelectedIsMultiAddress(preSelectedReceiver)) {
        const [{ address }] = preSelectedReceiver.data.addresses;
        props.setAddress(address);
      }
    }
  }, [isMobile, isFormSelecting, preSelectedReceiver]);

  // Update nav button to use back button if coming from my-wallets
  useEffect(() => {
    if (isMobile && (!isFormSelecting || isFromMyWallets)) {
      updateHeaderProps({
        NavigationButton: MobileBackButton,
      });
    } else {
      updateHeaderProps();
    }
  }, [isFromMyWallets, isMobile, isFormSelecting]);

  return (
    <div className="receive-funds-layout">
      <ListArea formatMessage={formatMessage} />
      <QRArea
        formatMessage={formatMessage}
        notMobileOrNotHidden={notMobileOrNotHidden}
        setIsFormSelecting={setIsFormSelecting}
      />
      <FooterArea
        formatMessage={formatMessage}
        notMobileOrNotHidden={notMobileOrNotHidden}
      />
    </div>
  );
}

ReceiveFundsLayoutView.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  preSelectReceiver: PropTypes.func.isRequired,
  preSelectedReceiver: PropTypes.object,
  setAddress: PropTypes.func.isRequired,
  updateHeaderProps: PropTypes.func.isRequired,
};

ReceiveFundsLayoutView.defaultProps = {
  preSelectedReceiver: null,
};

const mapStateToProps = state => {
  const preSelectedReceiver = getPreSelectedReceiver(state);

  return {
    preSelectedReceiver,
  };
};

const mapDispatchToProps = {
  preSelectReceiver,
  setAddress,
};

export const ReceiveFundsLayout = connect(mapStateToProps, mapDispatchToProps)(withRouter(ReceiveFundsLayoutView));
