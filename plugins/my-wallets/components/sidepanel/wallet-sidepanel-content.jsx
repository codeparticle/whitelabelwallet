import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import {
  Button,
  DeterministicPassPhrase,
  TextInput,
  ToggleSwitch,
} from '@codeparticle/whitelabelwallet.styleguide';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import './wallet-sidepanel.scss';

const { TERMS_AND_CONDITIONS_PT2 } = MY_WALLETS;

const WalletSidepanelContent = ({
  handleBlurChange,
  handleCodeConfirmation,
  handleDataChange,
  isBlurred,
  isOpen,
  isShuffled,
  translations,
  toggleDisabledButton,
  step,
  wordArray,
}) => {
  const [nickname, setNickname] = useState('');
  const [isMultiAddress, setIsMultiAddress] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const onNicknameChange = e => setNickname(e.target.value);
  const fadeButtonOut = () => {
    setIsButtonVisible(false);
  };

  function toggleMultiAddress() {
    setIsMultiAddress(!isMultiAddress);
  }

  useEffect(() => {
    if (!isOpen) {
      setIsButtonVisible(true);
      setIsMultiAddress(false);
      setNickname('');
    }
  }, [isOpen]);

  useEffect(() => {
    toggleDisabledButton(isButtonVisible);
    if (!isButtonVisible) {
      handleBlurChange();
    }
  }, [isButtonVisible]);

  useEffect(() => {
    handleDataChange({
      multi_address: isMultiAddress ? 1 : 0,
      name: nickname,
    });
  }, [nickname, isMultiAddress]);
  // Todo: need to add support for wallet passwords (WLW-146)

  switch (step) {
    case 1:
      return (
        <div className="content-container">
          <TextInput
            label={translations.walletNickname}
            placeholder={translations.walletPlaceholder}
            value={nickname}
            className='wallet-nickname'
            onChange={onNicknameChange}
          />
          <label className="generate-label" htmlFor="generate-code">{translations.recoveryCode}</label>
          <div className="generate-code-wrapper">
            <div className={`button-box ${isButtonVisible ? '' : 'fade-out hide'}`}>
              <Button
                onClick={fadeButtonOut}
                variant="slate"
                id="generate-code"
              >
                {translations.generateButton}
              </Button>
            </div>
            <div className={`pass-phrase-wrapper fade-in`}>
              <DeterministicPassPhrase
                isBlurred={isBlurred}
                isShuffled={isShuffled}
                onCompletion={handleCodeConfirmation}
                wordArray={wordArray}
              />
            </div>
          </div>
          <p className="small-grey-text">{translations.keepSecret}</p>
          <div className="multi-address-prompt">
            <label htmlFor="multi-address-btn" className="multi-address-text">{translations.multiAddressLabel}</label>
            <ToggleSwitch
              id="multi-address-btn"
              onClick={toggleMultiAddress}
              value={isMultiAddress}
            />
          </div>
        </div>
      );
    case 2:
      return (
        <div className="content-container">
          <label className="confirm-recovery-label" htmlFor="generate-code">{translations.confirmRecoveryLabel}</label>
          <div className="generate-code-wrapper">
            <div className={`pass-phrase-wrapper`}>
              <DeterministicPassPhrase
                isBlurred={isButtonVisible}
                onCompletion={handleCodeConfirmation}
                isShuffled={isShuffled}
                wordArray={wordArray}
              />
            </div>
          </div>
          <p className="small-grey-text">{translations.confirmRecoveryPrompt}</p>
        </div>
      );
    case 3:
      return (
        <div className="content-container">
          <label>{translations.disclaimerLabel}</label>
          <p>{translations.disclaimer}</p>
          <div className="terms-wrapper">
            <p className="italic-text">{translations.termsAndConditionsPt1}</p>
            <p className="section-spacer">{ translations.termsAndConditionsSectionTitle}</p>
            <p><FormattedMessage {...TERMS_AND_CONDITIONS_PT2} values={{ br: <br />  }} /></p>
          </div>
        </div>
      );
    default:
      return (
        <div>{null}</div>
      );
  }
};

WalletSidepanelContent.propTypes = {
  handleBlurChange: PropTypes.func.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  handleCodeConfirmation: PropTypes.func.isRequired,
  isBlurred: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isShuffled: PropTypes.bool.isRequired,
  translations: PropTypes.object.isRequired,
  toggleDisabledButton: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  wordArray: PropTypes.array.isRequired,
};

export { WalletSidepanelContent };
