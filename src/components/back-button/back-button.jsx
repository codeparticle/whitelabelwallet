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
import { PROP_TYPES } from 'lib/constants';

const { requiredIfNotOther } = PROP_TYPES;
const { SvgChevronLeft } = svgs.icons;

function BackButtonView({
  history,
  onClick,
  to,
}) {
  const goTo = () => {
    history.push(to);
  };

  return (
    <IconButton
      className="page-header__icon"
      onClick={onClick || goTo}
      variant={IconVariants.SLATE}
      icon={<SvgChevronLeft height={20} width={20} />}
    />
  );
}

BackButtonView.propTypes = {
  history: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  to: requiredIfNotOther('onClick', null),
};

BackButtonView.defaultProps = {
  onClick: null,
};

const BackButton = withRouter(BackButtonView);

export { BackButton };
