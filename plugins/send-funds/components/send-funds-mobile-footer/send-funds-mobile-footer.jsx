/**
 * @fileoverview Footer present on send funds mobile page
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { VARIANTS } from 'lib/constants';

import './send-funds-mobile-footer.scss';

const { GREEN } = VARIANTS;

function SendFundsMobileFooter({ isDisabled, label, onClick }) {
  return (
    <div className="send-funds-mobile-footer">
      <Button disabled={isDisabled} onClick={onClick} size="full" variant={GREEN}>
        <p>{label}</p>
      </Button>
    </div>
  );
}

SendFundsMobileFooter.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { SendFundsMobileFooter };
