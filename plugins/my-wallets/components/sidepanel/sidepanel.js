import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  Button,
  Overlay,
  TextInput,
  ToggleSwitch,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';


import './sidepanel.scss';

const { SvgWallet } = svgs.icons;

const SidepanelContent = ({ translations }) => {
  const [nickname, setNickname] = useState('');
  const [isMultiAddress, setIsMultiAddress] = useState(false);
  const onNicknameChange = e => setNickname(e.target.value);
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
          <div className='button-box'>
            <Button
              onClick={console.log('footer button clicked')}
              variant='slate'
              id='generate-code'
            >
              {translations.generateButton}
            </Button>
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

const SidepanelFooter = ({ translations }) => {
  return (
    <div className='content-footer'>
      <Button
        onClick={console.log('footer button clicked')}
        variant='primary'
      >
        {translations.continueButton}
      </Button>
    </div>

  );
};

const SidepanelView = ({
  isOpen,
  onClose,
  translations,
}) => {
  return (
    <Overlay
      onClose={onClose}
      isOpen={isOpen}
      type={'sidepanel'}
      title={translations.newWalletTitle}
      subTitle={translations.newWalletSubTitle}
      Icon={SvgWallet}
    >
      <SidepanelContent translations={translations} />
      <SidepanelFooter translations={translations}/>
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
