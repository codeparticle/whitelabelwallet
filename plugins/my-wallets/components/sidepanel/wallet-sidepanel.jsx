import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {
  Overlay,
  svgs,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getSidepanelVariant } from 'lib/utils';
import { WalletManager } from 'api';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { COMMON } from 'translations/keys/common';
import { createWalletAndUpdateList } from 'plugins/my-wallets/helpers';
import { WalletSidepanelContent } from 'plugins/my-wallets/components/sidepanel/wallet-sidepanel-content';
import './wallet-sidepanel.scss';

const { SvgWallet } = svgs.icons;
const initialSate = {
  multi_address: 0,
  name: '',
  seed: [],
  coin_id: 1,
  require_password: 0,
  password_hash: '',
};

function getTranslations(formatMessage, currentStep) {
  return {
    continueButton: formatMessage(MY_WALLETS.CONTINUE_BUTTON),
    confirmRecoveryLabel: formatMessage(MY_WALLETS.CONFIRM_RECOVERY_CODE_LABEL),
    confirmRecoveryPrompt: formatMessage(MY_WALLETS.CONFIRM_RECOVERY_PROMPT),
    disclaimer: formatMessage(MY_WALLETS.NEW_WALLET_DISCLAIMER),
    disclaimerLabel: formatMessage(MY_WALLETS.NEW_WALLET_DISCLAIMER_LABEL),
    generateButton: formatMessage(MY_WALLETS.GENERATE_CODE_BUTTON),
    keepSecret: formatMessage(MY_WALLETS.KEEP_SECRET_TEXT),
    multiAddressLabel: formatMessage(MY_WALLETS.MULTI_ADDRESS_LABEL),
    newWalletTitle: formatMessage(MY_WALLETS.NEW_WALLET_TEXT),
    newWalletSubTitle: formatMessage(MY_WALLETS.NEW_WALLET_SUB_TITLE, { currentStep: currentStep || 1 }),
    recoveryCode: formatMessage(MY_WALLETS.RECOVERY_CODE_LABEL),
    termsOfService: formatMessage(COMMON.TOS),
    termsAndConditionsLabel: formatMessage(MY_WALLETS.TERMS_AND_CONDITIONS_LABEL),
    termsAndConditionsPt1: formatMessage(MY_WALLETS.TERMS_AND_CONDITIONS_PT1),
    termsAndConditionsSectionTitle: formatMessage(MY_WALLETS.TERMS_AND_CONDITIONS_SECTION_TITLE),
    walletNickname: formatMessage(MY_WALLETS.WALLET_NICKNAME_LABEL),
    walletPlaceholder: formatMessage(MY_WALLETS.NEW_WALLET_TEXT),
  };
}

const WalletSidepanelView = ({
  isOpen,
  intl: {
    formatMessage,
  },
  setWallets,
  onClose,
}) => {
  const getWords = () => {
    return WalletManager.generateSecretPhrase();
  };
  const { isMobile } = useMedia();
  const [wordArray, setWordArray] = useState(getWords());
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [termsOfServiceAgreed, setTermsOfServiceAgreed] = useState(false);
  const [mobileTermsOfServiceButtonVisible, setMobileTermsOfServiceButtonVisible] = useState(true);
  const [walletData, setWalletData] = useState(initialSate);
  const panelVariant = getSidepanelVariant({ isMobile });

  const toggleDisabledButton = (isButtonVisible) => {
    setIsDisabled(isButtonVisible);
  };

  const handleSubmit = () => {
    if (currentStep ===  1) {
      setCurrentStep(2);
    } else if (isConfirmed && currentStep ===  2) {
      const seed = WalletManager.getBlockchainManager(walletData.coin_id).arrayToPhrase(wordArray);
      setWalletData({ ...walletData, seed });
      setIsDisabled(true);
      setCurrentStep(3);
    } else if (currentStep === 3) {
      createWalletAndUpdateList(walletData, setWallets).then(onClose);
    }
  };

  const handleDataChange = (newData) => {
    setWalletData({
      ...walletData,
      ...newData,
    });
  };

  const handleCodeConfirmation = () => {
    setIsConfirmed(true);
  };

  const handleBlurChange = () => {
    setIsBlurred(!isBlurred);
  };

  const handleMobileTermsClick = () => {
    setMobileTermsOfServiceButtonVisible(false);
  };

  const handleMobileTermsChecked = () => {
    setTermsOfServiceAgreed(!termsOfServiceAgreed);
    setIsDisabled(false);
  };

  const translations = getTranslations(formatMessage, currentStep);
  const isMobileDisclaimerPage = (mobileTermsOfServiceButtonVisible && (currentStep === 3) && isMobile);
  const disableFooter = isDisabled || (currentStep === 3 && !termsOfServiceAgreed);
  const getClassNames = () => {
    const defaultClass = 'new-wallet';
    if (isMobileDisclaimerPage) {
      return `${defaultClass} shrink`;
    } else if (currentStep === 3 && isMobile) {
      return `${defaultClass} expand`;
    }
    return defaultClass;
  };

  useEffect(() => {
    if (!isOpen) {
      setWalletData(initialSate);
      setIsConfirmed(false);
      setIsShuffled(false);
      setIsBlurred(true);
      setCurrentStep(1);
      setTermsOfServiceAgreed(false);
      setWordArray(getWords());
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentStep === 2) {
      setIsShuffled(true);
    }
  }, [currentStep]);

  return (
    <div className={getClassNames()}>
      <Overlay
        onClose={onClose}
        isOpen={isOpen}
        onClick={() => {
          handleSubmit(walletData);
        }}
        checkBoxLabel={translations.termsAndConditionsLabel}
        hasCancelButton={false}
        hasCheckbox={currentStep === 3}
        hasFooter={!isMobileDisclaimerPage}
        type={panelVariant}
        disableFooterButton={disableFooter}
        title={translations.newWalletTitle}
        subTitle={translations.newWalletSubTitle}
        Icon={SvgWallet}
      >
        <WalletSidepanelContent
          isOpen={isOpen}
          isShuffled={isShuffled}
          isBlurred={isBlurred}
          handleCodeConfirmation={handleCodeConfirmation}
          handleDataChange={handleDataChange}
          handleBlurChange={handleBlurChange}
          handleMobileTermsClick={handleMobileTermsClick}
          handleMobileTermsChecked={handleMobileTermsChecked}
          toggleDisabledButton={toggleDisabledButton}
          translations={translations}
          type={panelVariant}
          step={currentStep}
          showMobileTermsButton={mobileTermsOfServiceButtonVisible}
          wordArray={wordArray}
        />
      </Overlay>
    </div>
  );
};

WalletSidepanelView.propTypes = {
  intl: intlShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setWallets: PropTypes.func.isRequired,
};

const WalletSidepanel = injectIntl(WalletSidepanelView);

export { WalletSidepanel };
