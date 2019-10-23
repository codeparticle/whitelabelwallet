/**
 * @fileoverview Receipt layout for successful transaction
 * @author Gabriel Womble
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import { Overlay, ReceiptContainer, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { RenderProp } from 'components';
import { VARIANTS } from 'lib/constants';
import { TRANSLATION_KEYS } from 'translations/keys';

import { TruncatedText } from 'plugins/send-funds/components';
import { getWalletNameByAddress, notEmptyOrNull } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import './send-funds-receipt.scss';

const {
  SENT_FROM,
  SENT_TO,
} = SEND_FUNDS;
const { COMMON } = TRANSLATION_KEYS;
const { AMOUNT, DESCRIPTION, PENDING, STATUS } = COMMON;
const { OVERLAY } = VARIANTS;
const { SvgCoinSymbol, SvgSend } = svgs.icons;

const Icon = ({ fill }) => <SvgSend height={70} width={100} fill={fill} />;
const Coin = () => <SvgCoinSymbol height={18} width={14} />;

function ReceiptItem({ className, children, value, label }) {
  return (
    <Visible when={Boolean(children || value)}>
      <div className="send-funds-receipt-item">
        <label>
          <span>{label}</span>
        </label>
        <div className={`send-funds-receipt-item__text ${className || ''}`}>
          <Visible when={!children} fallback={<RenderProp>{children}</RenderProp>}>
            <TruncatedText value={value} />
          </Visible>
        </div>
      </div>
    </Visible>
  );
}


function SendFundsReceipt({
  data,
  formatMessage,
  isOpen,
  onClose,
  title,
}) {
  const [walletName, setWalletName] = useState('');
  const renderSafely = key => data && data[key] ? data[key] : '';
  const renderedAmount = `-${parseFloat(renderSafely('amount')).toFixed(2)}`;


  useEffect(() => {
    if (notEmptyOrNull(data)) {
      getWalletNameByAddress(setWalletName, data.sender_address);
    }
  }, [data]);

  return (
    <div className="send-funds-receipt-container">
      <Overlay
        background={'initial'}
        hasFooter={false}
        Icon={Icon}
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        type={OVERLAY}
      >
        <ReceiptContainer>
          <div className="send-funds-receipt-layout">
            <div className="send-funds-receipt-layout__multi-column">
              <ReceiptItem label="Wallet"value={walletName} />
              <ReceiptItem className="send-funds-receipt-amount" label={formatMessage(AMOUNT)}>
                <Coin />
                <p>{renderedAmount}</p>
              </ReceiptItem>
            </div>
            <ReceiptItem label={formatMessage(SENT_FROM)} value={renderSafely('sender_address')} />
            <ReceiptItem label={formatMessage(SENT_TO)} value={renderSafely('receiver_address')} />
            <ReceiptItem
              className="send-funds-receipt-status"
              label={formatMessage(STATUS)}
              value={formatMessage(PENDING)}
            />
            <Visible when={Boolean(data && data.description)}>
              <ReceiptItem label={formatMessage(DESCRIPTION)} value={renderSafely('description')} />
            </Visible>
          </div>
        </ReceiptContainer>
      </Overlay>
    </div>
  );
}

SendFundsReceipt.propTypes = {
  data: PropTypes.object,
  formatMessage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

SendFundsReceipt.defaultProps = {
  data: null,
};

export { SendFundsReceipt };
