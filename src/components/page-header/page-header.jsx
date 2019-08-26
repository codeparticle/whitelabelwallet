/**
 * @fileoverview PageHeader wrapper for more consistent implementation in WLW
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  PageHeader as PageHeaderView,
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
  PrimaryAction,
  SecondaryAction,
  title,
  to,
  type,
}) => {
  function NavigationButton(props) {
    return type === PRIMARY
      ? <NavTrigger {...props} />
      : <BackButton to={to} {...props} />;
  }

  const pageHeaderProps = {
    IconButtons: HeaderActionButtons,
    NavigationButton,
    PrimaryAction,
    SecondaryAction,
    title,
  };

  return (
    <div className="page-header">
      <PageHeaderView {...pageHeaderProps} />
    </div>
  );
};

PageHeader.defaultProps = {
  to: '/',
  type: PRIMARY,
};

PageHeader.propTypes = {
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
