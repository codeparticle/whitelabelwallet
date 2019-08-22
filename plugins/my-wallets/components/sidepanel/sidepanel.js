import React from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { injectIntl } from 'react-intl';

import './sidepanel.scss';

const { SvgWallet } = svgs.icons;

const SidepanelContent = () => {
  return (
    <div className='content-container'>
      <p>Sidepanel Content here</p>
      <style jsx>
        {`
            .content-container {
                align-items: center;
                display: flex;
                flex-direction: column;
                height: 100%;
                padding: 25px;
                width: 100%;
            }
            `}
      </style>
    </div>
  );
};

const SidepanelView = ({
  isOpen,
  onClose,
}) => {
  return (
    <Overlay
      onClose={onClose}
      isOpen={isOpen}
      type={'sidepanel'}
      title="New Wallet"
      subTitle="Step 1 of 3"
      Icon={SvgWallet}
    >
      <SidepanelContent />
    </Overlay>
  );
};

SidepanelView.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

SidepanelView.defaultProps = {
};

const Sidepanel = injectIntl(SidepanelView);

export { Sidepanel };
