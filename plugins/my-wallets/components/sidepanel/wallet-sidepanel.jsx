import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {
  Overlay,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { BlockchainManager } from 'api/mock-blockchain/blockchain';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { createWalletAndUpdateList } from 'plugins/my-wallets/helpers';
import { WalletSidepanelContent } from 'plugins/my-wallets/components/sidepanel/wallet-sidepanel-content';
import './wallet-sidepanel.scss';

const { SvgWallet } = svgs.icons;

const WalletSidepanelView = ({
  isOpen,
  intl: {
    formatMessage,
  },
  manager,
  setWallets,
  onClose,
}) => {
  const getWords = () => {
    return BlockchainManager.phraseToArray(BlockchainManager.generateSecretPhrase());
  };
  const [wordArray, setWordArray] = useState(getWords());
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const initialSate = {
    multiAddress: null,
    name: '',
    seed: BlockchainManager.arrayToPhrase(wordArray),
    coinId: 1,
    requirePassword: 0,
    password: '',
  };
  const [walletData, setWalletData] = useState(initialSate);
  console.log('========\n', 'walletData', walletData, '\n========');

  const toggleDisabledButton = (isButtonVisible) => {
    setIsDisabled(isButtonVisible);
  };

  const handleSubmit = () => {
    if (currentStep ===  1) {
      setCurrentStep(2);
    } else if (isConfirmed && currentStep ===  2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      console.log('Wallet Creation Complete');
      console.log('========\n', 'walletData', walletData, '\n========');
      // createWalletAndUpdateList(manager, setWallets, walletData).then(onClose);
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

  const translations = {
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
    termsAndConditionsLabel: formatMessage(MY_WALLETS.TERMS_AND_CONDITIONS_LABEL),
    termsAndConditionsPt1: formatMessage(MY_WALLETS.TERMS_AND_CONDITIONS_PT1),
    termsAndConditionsSectionTitle: formatMessage(MY_WALLETS.TERMS_AND_CONDITIONS_SECTION_TITLE),
    walletNickname: formatMessage(MY_WALLETS.WALLET_NICKNAME_LABEL),
    walletPlaceholder: formatMessage(MY_WALLETS.NEW_WALLET_TEXT),
  };

  useEffect(() => {
    if (!isOpen) {
      setWalletData(initialSate);
      setIsConfirmed(false);
      setIsShuffled(false);
      setIsBlurred(true);
      setCurrentStep(1);
      setWordArray(getWords());
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentStep === 2) {
      setIsShuffled(true);
    }
  }, [currentStep]);


  return (
    <Overlay
      onClose={onClose}
      isOpen={isOpen}
      onClick={() => {
        handleSubmit(walletData);
      }}
      checkBoxLabel={translations.termsAndConditionsLabel}
      hasCancelButton={false}
      hasCheckbox={currentStep === 3}
      type={'sidepanel'}
      disableFooterButton={isDisabled}
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
        toggleDisabledButton={toggleDisabledButton}
        translations={translations}
        step={currentStep}
        wordArray={wordArray}
      />
    </Overlay>
  );
};

WalletSidepanelView.propTypes = {
  intl: intlShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  manager: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setWallets: PropTypes.func.isRequired,
};

const WalletSidepanel = injectIntl(WalletSidepanelView);

export { WalletSidepanel };
