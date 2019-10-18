/**
 * @fileoverview Pattern for Header Action Buttons
 * @author Gabriel Womble
 */
import React, { Fragment, useState } from 'react';
import {
  IconButton,
  IconVariants,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { SettingsSidepanel } from 'components';
import { PROP_TYPES } from 'lib/constants';
import { settings as e2e } from 'e2e/constants';

const { SvgSettings } = svgs.icons;

const { iconPropsShape } = PROP_TYPES;

function SettingsButton({ iconProps }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSettingspanel = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <IconButton
        className="page-header__icon"
        dataSelector={e2e.selectors.openBtn.raw}
        variant={IconVariants.SLATE}
        onClick={toggleSettingspanel}
        icon={<SvgSettings {...iconProps} />}
      />
      <SettingsSidepanel
        isOpen={isOpen}
        onClose={toggleSettingspanel}
      />
    </Fragment>
  );
}

SettingsButton.propTypes = {
  iconProps: iconPropsShape,
};

export const HeaderActionButtons = [
  SettingsButton,
];
