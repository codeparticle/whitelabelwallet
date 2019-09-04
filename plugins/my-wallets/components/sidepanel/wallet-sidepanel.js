import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import {
  Button,
  DeterministicPassPhrase,
  Overlay,
  TextInput,
  ToggleSwitch,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { createNewWallet } from 'plugins/my-wallets/rdx/actions';
import { getNewWallet } from 'plugins/my-wallets/rdx/selectors';
import { BlockchainManager } from 'api/mock-blockchain/blockchain';
import { MY_WALLETS } from 'plugins/my-wallets/translations/keys';
import './wallet-sidepanel.scss';

const { SvgWallet } = svgs.icons;

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

  useEffect(() => {
    return () => {
      if (!isOpen) {
        setIsButtonVisible(true);
        setIsMultiAddress(false);
        setNickname('');
      }
    };
  }, [isOpen]);

  useEffect(() => {
    toggleDisabledButton(isButtonVisible);
    if (!isButtonVisible) {
      handleBlurChange();
    }
  }, [isButtonVisible]);

  useEffect(() => {
    handleDataChange({
      multiAddress: isMultiAddress,
      nickname,
    });
  }, [nickname, isMultiAddress]);

  const onCompletion = () => {
    handleCodeConfirmation();
  };

  switch (step) {
    case 1:
      return (
        <div className="content-container">
          <TextInput
            label={translations.walletNickname}
            placeholder={translations.walletPlaceholder}
            value={nickname}
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
                onCompletion={onCompletion}
                wordArray={wordArray}
              />
            </div>
          </div>
          <p className="small-grey-text">{translations.keepSecret}</p>
          <div className="multi-address-prompt">
            <label htmlFor="multi-address-btn" className="multi-address-text">{translations.multiAddressLabel}</label>
            <ToggleSwitch
              id="multi-address-btn"
              onClick={()=> {
                setIsMultiAddress(!isMultiAddress);
              }}
            />
          </div>
        </div>
      );
    case 2:
      console.log('========\n', 'wordArray', wordArray, '\n========');
      return (
        <div className="content-container">
          <label htmlFor="generate-code">{translations.confirmRecoveryLabel}</label>
          <div className="generate-code-wrapper">
            <div className={`pass-phrase-wrapper`}>
              <DeterministicPassPhrase
                isBlurred={isButtonVisible}
                onCompletion={onCompletion}
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
            <p>{translations.termsAndConditionsSectionTitle}</p>
            <p>{translations.termsAndConditionsPt2}</p>
          </div>
        </div>
      );
    default:
      return (
        <div>{'So much nothing'}</div>
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


const WalletSidepanelView = ({
  createNewWallet,
  isOpen,
  intl: {
    formatMessage,
  },
  onClose,
  translations,
}) => {
  const initialSate = {
    currentStep: 3,
    multiAddress: null,
    nickname: '',
  };

  const getWords = () => {
    return BlockchainManager.phraseToArray(BlockchainManager.generateSecretPhrase());
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true);
  const [walletData, setWalletData] = useState(initialSate);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [wordArray, setWordArray] = useState(getWords());

  const toggleDisabledButton = (isButtonVisible) => {
    setIsDisabled(isButtonVisible);
  };

  const handleSubmit = () => {
    if (walletData.currentStep ===  1) {
      setWalletData({ ...walletData, currentStep: 2 });
    } else if (isConfirmed && walletData.currentStep ===  2) {
      setWalletData({ ...walletData, currentStep: 3 });
      setIsDisabled(true);
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

  useEffect(() => {
    if (isOpen) {
      setWalletData(initialSate);
      setIsConfirmed(false);
      setIsShuffled(false);
      setIsBlurred(true);
      setWordArray(getWords());
    }
  }, [isOpen]);

  useEffect(() => {
    if (walletData.currentStep === 2) {
      setIsShuffled(true);
    }
  }, [walletData]);

  console.log('========\n', 'translations.termsAndConditionsLabel', translations.termsAndConditionsLabel, '\n========');
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
      hasCheckbox={walletData.currentStep === 3}
      checkBoxLabel={translations.termsAndConditionsLabel}
      title={translations.newWalletTitle}
      subTitle={formatMessage(MY_WALLETS.NEW_WALLET_SUB_TITLE, { currentStep: walletData.currentStep || 1 })}
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
        step={walletData.currentStep}
        wordArray={wordArray}
      />
    </Overlay>
  );
};

WalletSidepanelView.propTypes = {
  intl: intlShape.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
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
