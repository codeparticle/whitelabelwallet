import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {
  Overlay,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { createNewWallet } from 'plugins/my-wallets/rdx/actions';
import { getNewWallet } from 'plugins/my-wallets/rdx/selectors';
import { BlockchainManager } from 'api/mock-blockchain/blockchain';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import { WalletSidepanelContent } from 'plugins/my-wallets/components/sidepanel/wallet-sidepanel-content';
import './wallet-sidepanel.scss';

const { SvgWallet } = svgs.icons;

const WalletSidepanelView = ({
  createNewWallet,
  isOpen,
  intl: {
    formatMessage,
  },
  onClose,
}) => {
  const initialSate = {
    multiAddress: null,
    nickname: '',
  };

  const getWords = () => {
    return BlockchainManager.phraseToArray(BlockchainManager.generateSecretPhrase());
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [walletData, setWalletData] = useState(initialSate);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [wordArray, setWordArray] = useState(getWords());

  const toggleDisabledButton = (isButtonVisible) => {
    setIsDisabled(isButtonVisible);
  };

  const handleSubmit = () => {
    if (currentStep ===  1) {
      setCurrentStep(2);
    } else if (isConfirmed && currentStep ===  2) {
      setCurrentStep(3);
    } else {
      console.log('Wallet Creation Complete');
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
    generateButton: formatMessage(MY_WALLETS.GENERATE_CODE_BUTTON),
    continueButton: formatMessage(MY_WALLETS.CONTINUE_BUTTON),
    confirmRecoveryLabel: formatMessage(MY_WALLETS.CONFIRM_RECOVERY_CODE_LABEL),
    confirmRecoveryPrompt: formatMessage(MY_WALLETS.CONFIRM_RECOVERY_PROMPT),
    keepSecret: formatMessage(MY_WALLETS.KEEP_SECRET_TEXT),
    multiAddressLabel: formatMessage(MY_WALLETS.MULTI_ADDRESS_LABEL),
    newWalletTitle: formatMessage(MY_WALLETS.NEW_WALLET_TEXT),
    newWalletSubTitle: formatMessage(MY_WALLETS.NEW_WALLET_SUB_TITLE, { currentStep: currentStep || 1 }),
    recoveryCode: formatMessage(MY_WALLETS.RECOVERY_CODE_LABEL),
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
      hasCancelButton={false}
      type={'sidepanel'}
      disableFooterButton={isDisabled}
      title={translations.newWalletTitle}
      subTitle={translations.newWalletSubTitle}
      Icon={SvgWallet}
    >
      <WalletSidepanelContent
        translations={translations}
        isOpen={isOpen}
        isShuffled={isShuffled}
        isBlurred={isBlurred}
        toggleDisabledButton={toggleDisabledButton}
        handleCodeConfirmation={handleCodeConfirmation}
        handleDataChange={handleDataChange}
        handleBlurChange={handleBlurChange}
        createNewWallet={createNewWallet}
        step={currentStep}
        wordArray={wordArray}
      />
    </Overlay>
  );
};

WalletSidepanelView.propTypes = {
  intl: intlShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createNewWallet: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  createNewWallet,
};

const mapSateToProps =  (state) => {
  const newWallet = getNewWallet(state);

  return {
    newWallet,
  };
};

const WalletSidepanel = connect(mapSateToProps, mapDispatchToProps) (injectIntl(WalletSidepanelView));

export { WalletSidepanel };
