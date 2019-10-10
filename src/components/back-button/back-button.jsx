/**
 * @fileoverview A reusable back button pattern
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  IconButton,
  IconVariants,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';

const { SvgChevronLeft } = svgs.icons;

function BackButtonView({
  history,
  to,
}) {
  const onClick = () => {
    console.log('========\n', 'history', history, '\n========');
    console.log('========\n', 'to', to, '\n========');
    history.push(to);
  };

  return (
    <IconButton
      className="page-header__icon"
      onClick={onClick}
      variant={IconVariants.SLATE}
      icon={<SvgChevronLeft height={20} width={20} />}
    />
  );
}

BackButtonView.propTypes = {
  history: PropTypes.object.isRequired,
  to: PropTypes.string.isRequired,
};

const BackButton = withRouter(BackButtonView);

export { BackButton };
