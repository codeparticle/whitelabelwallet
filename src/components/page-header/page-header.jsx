/**
 * @fileoverview PageHeader wrapper for more consistent implementation in WLW
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  PageHeader as PageHeaderView,
  useMedia,
} from '@codeparticle/whitelabelwallet.styleguide';
import {
  BackButton,
  HeaderActionButtons,
  NavTrigger,
} from 'components';
import { VARIANTS } from 'lib/constants';
import './page-header.scss';

const { PRIMARY, SECONDARY } = VARIANTS;

const PageHeader = ({
  NavigationButton,
  PrimaryAction,
  SecondaryAction,
  title,
  to,
  type,
}) => {
  const { isDesktop, isWideScreen } = useMedia();
  const hideNavButton = ((isDesktop || isWideScreen) && type === PRIMARY);
  function NavButton(props) {
    return type === PRIMARY
      ? <NavTrigger {...props} />
      : <BackButton to={to} {...props} />;
  }


  const pageHeaderProps = {
    IconButtons: HeaderActionButtons,
    NavigationButton: hideNavButton ? () => null : (NavigationButton || NavButton),
    PrimaryAction,
    SecondaryAction,
    title,
  };

  return (
    <header className="page-header">
      <PageHeaderView {...pageHeaderProps} />
    </header>
  );
};

PageHeader.defaultProps = {
  NavigationButton: null,
  to: '/',
  type: PRIMARY,
};

PageHeader.propTypes = {
  NavigationButton: PropTypes.func,
  PrimaryAction: PropTypes.func,
  SecondaryAction: PropTypes.func,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  type: PropTypes.oneOf([
    PRIMARY,
    SECONDARY,
  ]),
};

export { PageHeader };
