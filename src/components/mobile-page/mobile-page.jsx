/**
 * @fileoverview MobilePage wrapper for more consistent implementation in WLW
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MobilePage as MobilePageView,
} from '@codeparticle/whitelabelwallet.styleguide';
import {
  NavTrigger,
} from 'components';

function MobilePage({
  children,
  Icon,
  PrimaryAction,
  title,
}) {
  const pageViewProps = {
    Icon,
    NavigationButton: NavTrigger,
    PrimaryAction,
    title,
  };

  return (
    <MobilePageView {...pageViewProps}>
      {children}
    </MobilePageView>
  );
}

MobilePage.propTypes = {
  children: PropTypes.node.isRequired,
  Icon: PropTypes.func.isRequired,
  PrimaryAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export { MobilePage };
