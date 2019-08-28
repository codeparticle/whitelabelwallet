/**
 * @fileoverview A reusable back button pattern
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { PROP_TYPES } from 'lib/constants';
import {
  Icon,
  IconVariants,
  svgs,
} from '@codeparticle/whitelabelwallet.styleguide';

const { iconPropsShape } = PROP_TYPES;
const { SvgChevronLeft } = svgs.icons;

function BackButtonView({
  iconProps,
  history,
  to,
}) {
  const onClick = () => {
    history.push(to);
  };

  return (
    <Icon
      className="page-header__icon"
      onClick={onClick}
      variant={IconVariants.SLATE}
      icon={<SvgChevronLeft {...iconProps} />}
    />
  );
}

BackButtonView.propTypes = {
  history: PropTypes.object.isRequired,
  iconProps: iconPropsShape,
  to: PropTypes.string.isRequired,
};

const BackButton = withRouter(BackButtonView);

export { BackButton };
