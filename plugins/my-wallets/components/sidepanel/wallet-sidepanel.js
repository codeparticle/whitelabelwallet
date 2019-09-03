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
  handleDataChange,
  isOpen,
  isShuffled,
  translations,
  toggleDisabledButton,
  step,
}) => {
  const generateDefaultWords = () => {
    const arr = [];
    for (let i = 0; i < 24; i += 1) {
      arr.push('...');
    }
    return arr;
  };
  const [nickname, setNickname] = useState('');
  const [isMultiAddress, setIsMultiAddress] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [wordArray, setWordArray] = useState(generateDefaultWords());
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
        setWordArray(generateDefaultWords());
      }
    };
  }, [isOpen]);

  useEffect(() => {
    toggleDisabledButton(isButtonVisible);
    if (!isButtonVisible) {
      setWordArray(BlockchainManager.phraseToArray(BlockchainManager.generateSecretPhrase()));
    }
  }, [isButtonVisible]);

  useEffect(() => {
    handleDataChange({
      multiAddress: isMultiAddress,
      nickname,
    });
  }, [nickname, isMultiAddress]);

  const onCompletion = () => console.log('completed');

  switch (step) {
    case 1:
      console.log('========\n', 'wordArray', wordArray, '\n========');
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
                isBlurred={isButtonVisible}
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
      console.log('========\n', 'wordArray step 2', wordArray, '\n========');
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
    default:
      return (
        <div>{'So much nothing'}</div>
      );
  }
};

WalletSidepanelContent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
  toggleDisabledButton: PropTypes.func.isRequired,
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
    currentStep: 1,
    multiAddress: null,
    nickname: '',
  };
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShuffled, setIsShuffled] = useState(false);
  const [walletData, setWalletData] = useState(initialSate);
  const toggleDisabledButton = (isButtonVisible) => {
    setIsDisabled(isButtonVisible);
  };
  const handleSubmit = () => {
    setWalletData({ ...walletData, currentStep: 2 });
  };

  const handleDataChange = (newData) => {
    setWalletData({
      ...walletData,
      ...newData,
    });
  };

  useEffect(() => {
    setWalletData(initialSate);
  }, [isOpen]);

  useEffect(() => {
    if (walletData.currentStep === 2) {
      setIsShuffled(true);
    }
  }, [walletData]);


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
      subTitle={formatMessage(MY_WALLETS.NEW_WALLET_SUB_TITLE, { currentStep: walletData.currentStep || 1 })}
      Icon={SvgWallet}
    >
      <WalletSidepanelContent
        translations={translations}
        isOpen={isOpen}
        isShuffled={isShuffled}
        toggleDisabledButton={toggleDisabledButton}
        handleDataChange={handleDataChange}
        createNewWallet={createNewWallet}
        step={walletData.currentStep}
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
