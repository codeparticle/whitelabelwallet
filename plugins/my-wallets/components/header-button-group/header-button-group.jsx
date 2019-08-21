import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { TRANSLATION_KEYS } from 'translations/keys';
import { empty } from 'lib/utils';
import './header-button-group.scss';

const { SvgSettings, SvgUserAccount } = svgs.icons;

const { WALLETS } = TRANSLATION_KEYS;

/**
  @typedef props
  @type {Object}
  @property {Object} intl
*/

/**
  Renders a Header Button Group
  @param {props} props
  @returns {Node} - rendered Header Button Group
*/
const HeaderButtonGroup = ({ formatMessage }) => {
  return (
    <div className="header-button-group-rct-component">
      <Button
        onClick={empty}
        variant="primary"
        size="sm"
      >
        {formatMessage(WALLETS.ADD_WALLET_BUTTON_LABEL)}
      </Button>
      <Icon
        className="header-button-group-rct-component__icon"
        variant="slate"
        onClick={empty}
        icon={<SvgSettings />}
      />
      <Icon
        className="header-button-group-rct-component__icon"
        variant="slate"
        onClick={empty}
        icon={<SvgUserAccount />}
      />
    </div>
  );
};

HeaderButtonGroup.propTypes = {
  formatMessage: PropTypes.func.isRequired,
};

export { HeaderButtonGroup };
