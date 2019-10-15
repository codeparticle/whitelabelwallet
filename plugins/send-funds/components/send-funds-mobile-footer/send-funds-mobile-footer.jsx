/**
 * @fileoverview Footer present on send funds mobile page
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { PROP_TYPES, VARIANTS } from 'lib/constants';
import { RenderProp } from 'components';

import './send-funds-mobile-footer.scss';

const { renderable } = PROP_TYPES;
const { GREEN } = VARIANTS;

function SendFundsMobileFooter({ alert, isDisabled, label, onClick }) {
  return (
    <div className="send-funds-mobile-footer">
      <RenderProp>{alert}</RenderProp>
      <Button disabled={isDisabled} onClick={onClick} size="full" variant={GREEN}>
        <p>{label}</p>
      </Button>
    </div>
  );
}

SendFundsMobileFooter.propTypes = {
  alert: renderable.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { SendFundsMobileFooter };
