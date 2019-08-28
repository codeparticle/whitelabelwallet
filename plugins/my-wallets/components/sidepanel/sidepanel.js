import React, { useState, useEffect } from 'react';
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


import './sidepanel.scss';

const { SvgWallet } = svgs.icons;

const SidepanelContent = ({
  translations,
  showButton,
  isOpen,
  isShuffled,
  toggleDisabledButton,
}) => {
  const [nickname, setNickname] = useState('');
  const [isMultiAddress, setIsMultiAddress] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(showButton);
  const onNicknameChange = e => setNickname(e.target.value);
  const fadeButtonOut = () => {
    setIsButtonVisible(false);
  };

  useEffect(() => {
    return () => {
      if (!isOpen) {
        setIsButtonVisible(true);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    toggleDisabledButton(isButtonVisible);
  }, [isButtonVisible]);

  const generateArray = () => {
    const arr = [];
    for (let i = 0; i < 24; i += 1) {
      arr.push(`Word: ${i + 1}`);
    }

    return arr;
  };

  const wordArray = generateArray();
  const onCompletion = () => console.log('completed');

  return (
    <div className='wrapper'>
      <div className='content-background'>
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
                isShuffled={isShuffled}
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
                setIsMultiAddress(!isMultiAddress)
                ;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


const SidepanelView = ({
  isOpen,
  onClose,
  showButton,
  translations,
  isShuffled,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const toggleDisabledButton = (isButtonVisible) => {
    setIsDisabled(isButtonVisible);
  };

  return (
    <Overlay
      onClose={onClose}
      isOpen={isOpen}
      hasCancelButton={false}
      type={'sidepanel'}
      disableFooterButton={isDisabled}
      title={translations.newWalletTitle}
      subTitle={translations.newWalletSubTitle}
      Icon={SvgWallet}
    >
      <SidepanelContent
        translations={translations}
        isShuffled={isShuffled}
        showButton={showButton}
        isOpen={isOpen}
        toggleDisabledButton={toggleDisabledButton}

      />
    </Overlay>
  );
};

SidepanelView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  translations: PropTypes.object.isRequired,
};

const Sidepanel = injectIntl(SidepanelView);

export { Sidepanel };
