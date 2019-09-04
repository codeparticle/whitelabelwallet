/**
 * @fileoverview NavButton Pattern used w/ PageHeader
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IconButton,
  IconVariants,
  useMedia,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';
import { getRdxActionMapper, getRdxSelectionMapper } from 'rdx/utils/props-mapping';
import { PROP_TYPES } from 'lib/constants';

const { iconPropsShape } = PROP_TYPES;

const { SvgMenu } = svgs.icons;

function NavTriggerView({
  iconProps,
  isTabletNavBarOpen,
  toggleMobileNavBar,
  toggleTabletNavBar,
}) {
  const { isMobile } = useMedia();
  const onTriggerClick = () => {
    isMobile ? toggleMobileNavBar(true) : toggleTabletNavBar(!isTabletNavBarOpen);
  };
  const navBarTriggerVariant = !isMobile && isTabletNavBarOpen ? IconVariants.PRIMARY : IconVariants.SLATE;

  return (
    <IconButton
      className="page-header__icon"
      onClick={onTriggerClick}
      variant={navBarTriggerVariant}
      icon={<SvgMenu {...iconProps} />}
    />
  );
}

NavTriggerView.propTypes = {
  iconProps: iconPropsShape,
  isTabletNavBarOpen: PropTypes.bool.isRequired,
  toggleMobileNavBar: PropTypes.func.isRequired,
  toggleTabletNavBar: PropTypes.func.isRequired,
};

const actionsMapper = getRdxActionMapper([
  'toggleMobileNavBar',
  'toggleTabletNavBar',
]);

const stateMapper = getRdxSelectionMapper({
  isTabletNavBarOpen: 'getIsTabletNavBarOpen',
});

const NavTrigger = connect(stateMapper, actionsMapper)(NavTriggerView);

export { NavTrigger };