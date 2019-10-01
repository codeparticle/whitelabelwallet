/**
 * @fileoverview MobilePage wrapper for more consistent implementation in WLW
 * @author Gabriel Womble
 */
import React, { Fragment } from 'react';
import { Visible } from '@codeparticle/react-visible';
import PropTypes from 'prop-types';
import {
  MobilePage as MobilePageView, CircularAddButton,
} from '@codeparticle/whitelabelwallet.styleguide';
import {
  NavTrigger,
} from 'components';

function MobilePage({
  children,
  Icon,
  PrimaryAction,
  title,
  onAddClicked,
}) {

  const pageViewProps = {
    Icon,
    NavigationButton: NavTrigger,
    PrimaryAction,
    title,
  };

  return (
    <Fragment>
      <MobilePageView {...pageViewProps}>
        {children}
      </MobilePageView>
      <Visible when={Boolean(onAddClicked)}>
        <div className="add-button-wrapper">
          <CircularAddButton onClick={onAddClicked} />
        </div>
      </Visible>
    </Fragment>

  );
}

MobilePage.propTypes = {
  children: PropTypes.node.isRequired,
  Icon: PropTypes.func.isRequired,
  onAddClick: PropTypes.func,
  PrimaryAction: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

MobilePage.defaultProps = {
  onAddedClick: null,
};

export { MobilePage };
