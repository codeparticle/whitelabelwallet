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

import { preSelectFromAddress } from 'plugins/send-funds/rdx/actions';
import { getPreSelectedFromAddress } from 'plugins/send-funds/rdx/selectors';

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

const isMultiAddress = preSelected => preSelected && preSelected.data.addresses.length !== 1;

function ReceiveFundsLayoutView({
  formatMessage,
  history,
  match,
  preSelectedFromAddress,
  updateHeaderProps,
  ...props
}) {
  const [isFormSelecting, setIsFormSelecting] = useState(isMultiAddress(preSelectedFromAddress));
  const { isMobile } = useMedia();
  const notMobileOrNotHidden = !isMobile || !isFormSelecting;
  const isFromMyWallets = match.path.includes(MY_WALLETS);

  function MobileBackButton(btnProps) {
    const onBackClick = () => {
      if (isFromMyWallets && (isFormSelecting || !isMultiAddress(preSelectedFromAddress))) {
        props.preSelectFromAddress(null);
        history.goBack();
      } else {
        setIsFormSelecting(true);
      }
    };

    return <BackButton onClick={onBackClick} {...btnProps} />;
  }

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
  preSelectFromAddress: PropTypes.func.isRequired,
  preSelectedFromAddress: PropTypes.object,
  updateHeaderProps: PropTypes.func.isRequired,
};

ReceiveFundsLayoutView.defaultProps = {
  preSelectedFromAddress: null,
};

const mapStateToProps = state => {
  const preSelectedFromAddress = getPreSelectedFromAddress(state);

  return {
    preSelectedFromAddress,
  };
};

const mapDispatchToProps = {
  preSelectFromAddress,
};

export const ReceiveFundsLayout = connect(mapStateToProps, mapDispatchToProps)(withRouter(ReceiveFundsLayoutView));
