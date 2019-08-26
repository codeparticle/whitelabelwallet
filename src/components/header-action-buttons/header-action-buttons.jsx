/**
 * @fileoverview Pattern for Header Action Buttons
 * @author Gabriel Womble
 */
import React from 'react';
import {
  Icon,
  IconVariants,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { PROP_TYPES } from 'lib/constants';
import { empty } from 'lib/utils';

const { SvgSettings, SvgUserAccount } = svgs.icons;

const { iconPropsShape } = PROP_TYPES;

function SettingsButton({ iconProps }) {
  return (
    <Icon
      className="page-header__icon"
      variant={IconVariants.SLATE}
      onClick={empty}
      icon={<SvgSettings {...iconProps} />}
    />
  );
}

SettingsButton.propTypes = {
  iconProps: iconPropsShape,
};

function AccountButton({ iconProps }) {
  return (
    <Icon
      className="page-header__icon"
      variant={IconVariants.SLATE}
      onClick={empty}
      icon={<SvgUserAccount {...iconProps} />}
    />
  );
}

AccountButton.propTypes = {
  iconProps: iconPropsShape,
};

export const HeaderActionButtons = [
  SettingsButton,
  AccountButton,
];
