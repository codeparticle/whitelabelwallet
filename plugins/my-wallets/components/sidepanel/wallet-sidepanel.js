import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
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
import './wallet-sidepanel.scss';

const { SvgWallet } = svgs.icons;

const WalletSidepanelContent = ({
  handleDataChange,
  isOpen,
  translations,
  toggleDisabledButton,
  step,
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
  }, [isButtonVisible]);

  useEffect(() => {
    handleDataChange({
      multiAddress: isMultiAddress,
      nickname,
    });
  }, [nickname, isMultiAddress]);

  const wordArray =  BlockchainManager.phraseToArray(BlockchainManager.generateSecretPhrase());
  const onCompletion = () => console.log('completed');

  switch (step) {
    case 1:
      return (
        <div className='content-container'>
          <TextInput
            label={translations.walletNickname}
            placeholder={translations.walletPlaceholder}
            value={nickname}
            onChange={onNicknameChange}
          />
          <label className='generate-label' htmlFor='generate-code'>{translations.recoveryCode}</label>
          <div className='generate-code-wrapper'>
            <div className={`button-box ${isButtonVisible ? '' : 'fade-out hide'}`}>
              <Button
                onClick={fadeButtonOut}
                variant='slate'
                id='generate-code'
              >
                {translations.generateButton}
              </Button>
            </div>
            <div className={`pass-phrase-wrapper fade-in`}>
              <DeterministicPassPhrase
                isBlurred={isButtonVisible}
                onCompletion={onCompletion}
                wordArray={wordArray}
              />
            </div>
          </div>
          <p className='keep-secret-text'>{translations.keepSecret}</p>
          <div className='multi-address-prompt'>
            <label htmlFor='multi-address-btn' className='multi-address-text'>{translations.multiAddressLabel}</label>
            <ToggleSwitch
              id='multi-address-btn'
              onClick={()=> {
                setIsMultiAddress(!isMultiAddress);
              }}
            />
          </div>
        </div>
      );
    case 2:
      return (
        <div className='content-container'>
          <div>{'Step 2'}</div>
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
  onClose,
  translations,
}) => {
  const initialSate = {
    currentStep: 1,
    multiAddress: null,
    nickname: '',
  };
  const [isDisabled, setIsDisabled] = useState(true);
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
        toggleDisabledButton={toggleDisabledButton}
        handleDataChange={handleDataChange}
        createNewWallet={createNewWallet}
        step={walletData.currentStep}
      />
    </Overlay>
  );
};

WalletSidepanelView.propTypes = {
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
