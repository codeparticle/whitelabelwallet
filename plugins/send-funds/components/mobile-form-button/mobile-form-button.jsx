/**
 * @fileoverview Mobile form button pattern for send funds
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { RenderProp } from 'components';
import { PROP_TYPES, VARIANTS } from 'lib/constants';

import './mobile-form-button.scss';

const { renderable } = PROP_TYPES;
const { SLATE_CLEAR } = VARIANTS;

function MobileFormButton({
  btnLabel,
  input,
  label,
  onClick,
}) {
  return (
    <div className="send-funds-mobile-form-btn">
      <label>
        <span>{label}</span>
      </label>
      <RenderProp>{input}</RenderProp>
      <Button
        onClick={onClick}
        variant={SLATE_CLEAR}
      >
        {btnLabel}
      </Button>
    </div>
  );
}

MobileFormButton.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  input: renderable,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export { MobileFormButton };
