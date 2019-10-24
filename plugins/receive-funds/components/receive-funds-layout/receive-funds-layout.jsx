/**
 * @fileoverview Component that manages layout of the Receive Funds Page
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import { useMedia } from '@codeparticle/whitelabelwallet.styleguide';
import { BackButton } from 'components';

import {
  ReceiveFundsAddressList,
  ReceiveFundsFooter,
  ReceiveFundsMobileFooter,
  ReceiveFundsQRCode,
  ReceiveFundsSelectAddress,
  RequestAmount,
} from 'plugins/receive-funds/components';
import './receive-funds-layout.scss';

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

function ReceiveFundsLayout({ formatMessage, updateHeaderProps }) {
  const [isFormSelecting, setIsFormSelecting] = useState(true);
  const { isMobile } = useMedia();
  const notMobileOrNotHidden = !isMobile || !isFormSelecting;

  function MobileBackButton(props) {
    const onBackClick = () => setIsFormSelecting(true);

    return <BackButton onClick={onBackClick} {...props} />;
  }

  useEffect(() => {
    if (isMobile && !isFormSelecting) {
      updateHeaderProps({
        NavigationButton: MobileBackButton,
      });
    } else {
      updateHeaderProps();
    }
  }, [isMobile, isFormSelecting]);

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

ReceiveFundsLayout.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  updateHeaderProps: PropTypes.func.isRequired,
};

export { ReceiveFundsLayout };
