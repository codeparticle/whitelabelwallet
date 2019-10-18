/**
 * @fileoverview A QR Reader component for reading an address
 * @author Gabriel Womble
 */
import React from 'react';
import QrReader from 'react-qr-reader';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import { Overlay, svgs } from '@codeparticle/whitelabelwallet.styleguide';
import { empty } from 'lib/utils';

import { isJson } from 'plugins/send-funds/helpers';
import { SEND_FUNDS } from 'plugins/send-funds/translations/keys';
import './send-funds-qr-reader.scss';

const { QR_INSTRUCTIONS, SCAN_QR_CODE } = SEND_FUNDS;
const { SvgQrCode } = svgs.icons;

const Icon = ({ fill }) => <SvgQrCode height={70} width={70} fill={fill} />;

function SendFundsQrReader({
  formatMessage,
  isOpen,
  setAmount,
  setIsOpen,
  setToAddress,
}) {

  function onClose() {
    if (isOpen) {
      setIsOpen(false);
    }
  }

  function handleScan(data) {
    if (isJson(data)) {
      const { amount = '', address = '' } = JSON.parse(data);

      if (amount) {
        setAmount(amount);
      }

      if (address) {
        setToAddress(address);
      }

      onClose();
    }
  }

  /**
   * This function is called when the QrReader first renders.
   * It appends a second div to the QrReader and gives both divs
   * classNames to style
   */
  function updateQrDomElements() {
    const videoContainer = document.querySelector('.send-funds-qr-overlay section > section');
    const topDiv = videoContainer.querySelector('div');
    topDiv.classList.add('video-focus-top');
    const lowerDiv = document.createElement('div');
    lowerDiv.classList.add('video-focus-bottom');
    videoContainer.appendChild(lowerDiv);
  }

  return (
    <div className="send-funds-qr-overlay">
      <Overlay
        hasFooter={false}
        isOpen={isOpen}
        onClose={onClose}
        Icon={Icon}
        title={formatMessage(SCAN_QR_CODE)}
      >
        <Visible when={isOpen}>
          <QrReader
            delay={300}
            onLoad={updateQrDomElements}
            onScan={handleScan}
            onError={empty}
          />
          <h4 className="qr-instructions">{formatMessage(QR_INSTRUCTIONS)}</h4>
        </Visible>
      </Overlay>
    </div>
  );
}

SendFundsQrReader.propTypes = {
  formatMessage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setAmount: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setToAddress: PropTypes.func.isRequired,
};

export { SendFundsQrReader };
