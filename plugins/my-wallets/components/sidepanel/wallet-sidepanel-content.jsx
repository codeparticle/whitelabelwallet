import React, { useState, useEffect, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Visible } from '@codeparticle/react-visible';
import {
  Button,
  DeterministicPassPhrase,
  LabeledCheckbox,
  OverflowContainer,
  TextInput,
  ToggleSwitch,
} from '@codeparticle/whitelabelwallet.styleguide';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { VARIANTS } from 'lib/constants';
import './wallet-sidepanel.scss';

const { TERMS_AND_CONDITIONS_PT2 } = MY_WALLETS;
const { OVERLAY, SIDEPANEL } = VARIANTS;

const WalletSidepanelContent = ({
  handleBlurChange,
  handleCodeConfirmation,
  handleDataChange,
  handleMobileTermsClick,
  isBlurred,
  isOpen,
  isShuffled,
  step,
  showMobileTermsButton,
  translations,
  type,
  toggleDisabledButton,
  wordArray,
}) => {
  const [nickname, setNickname] = useState('');
  const [isMultiAddress, setIsMultiAddress] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(!showMobileTermsButton);
  const onNicknameChange = e => setNickname(e.target.value);
  const fadeButtonOut = () => {
    setIsButtonVisible(false);
  };
  const checkBoxToggle = () => {
    setIsChecked(!isChecked);
  };


  function toggleMultiAddress() {
    setIsMultiAddress(!isMultiAddress);
  }

  useEffect(() => {
    if (!isOpen) {
      setIsButtonVisible(true);
      setIsMultiAddress(false);
      setNickname('');
      setIsChecked(false);
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

  const MobileTermsOfService = () => {
    return (
      <Fragment>
        <div className="mobile-terms-wrapper">
          <Visible when={showMobileTermsButton}>
            <div className="disclaimer">
              <label>{translations.disclaimerLabel}</label>
              <p>{translations.disclaimer}</p>
            </div>
            <div className="terms-box">
              <Button
                onClick={handleMobileTermsClick}
                variant="slate"
                size="lg"
                id="terms-of-service"
              >
                {translations.termsOfService}
              </Button>
            </div>
          </Visible>
          <Visible when={!showMobileTermsButton}>
            <OverflowContainer>
              <div className="terms-wrapper">
                <p className="italic-text">{translations.termsAndConditionsPt1}</p>
                <p className="section-spacer">{ translations.termsAndConditionsSectionTitle}</p>
                <p><FormattedMessage {...TERMS_AND_CONDITIONS_PT2} values={{ br: <br />  }} /></p>
              </div>
            </OverflowContainer>
            <div className="mobile-checkbox">
              <LabeledCheckbox
                label={translations.termsAndConditionsLabel}
                onChange={checkBoxToggle}
                checked={isChecked} />
            </div>
          </Visible>
        </div>
      </Fragment>
    );
  };

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
          <Visible when={type === SIDEPANEL} fallback={<MobileTermsOfService />}>
            <label>{translations.disclaimerLabel}</label>
            <p>{translations.disclaimer}</p>
            <div className="terms-wrapper">
              <p className="italic-text">{translations.termsAndConditionsPt1}</p>
              <p className="section-spacer">{ translations.termsAndConditionsSectionTitle}</p>
              <p><FormattedMessage {...TERMS_AND_CONDITIONS_PT2} values={{ br: <br />  }} /></p>
            </div>
          </Visible>
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
  handleMobileTermsClick: PropTypes.func.isRequired,
  isBlurred: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isShuffled: PropTypes.bool.isRequired,
  translations: PropTypes.object.isRequired,
  toggleDisabledButton: PropTypes.func.isRequired,
  type: PropTypes.oneOf([SIDEPANEL, OVERLAY]).isRequired,
  step: PropTypes.number.isRequired,
  showMobileTermsButton: PropTypes.bool.isRequired,
  wordArray: PropTypes.array.isRequired,
};

export { WalletSidepanelContent };
