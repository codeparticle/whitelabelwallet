/**
 * @fileoverview Button pattern for the PageHeader
 * TODO: Remove & replace usage w/ styleguide when WLW-105 (in styleguide) gets published
 * @author Gabriel Womble
 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { white } from '@codeparticle/whitelabelwallet.styleguide/styles/colors.scss';
import { Visible } from '@codeparticle/react-visible';
import { VARIANTS } from 'lib/constants';

const Fallback = ({ label }) => <span>{label}</span>;

Fallback.propTypes = {
  label: PropTypes.string.isRequired,
};

function IconWithLabel({ Icon, iconColor, label }) {
  return (
    <Fragment>
      <span className="btn-content">
        <Icon fill={iconColor} height={12} width={12} />
        {label}
      </span>
      <style jsx>
        {`
          .btn-content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          :global(.btn-content > svg) {
            margin-right: 6px;
          }
        `}
      </style>
    </Fragment>
  );
}

IconWithLabel.propTypes = {
  Icon: PropTypes.func.isRequired,
  iconColor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function HeaderButton({
  Icon,
  iconColor,
  label,
  onClick,
  variant,
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      size="sm"
    >
      <Visible when={Boolean(Icon)} fallback={<Fallback label={label} />}>
        <IconWithLabel
          label={label}
          iconColor={iconColor}
          Icon={Icon}
        />
      </Visible>
    </Button>
  );
}

HeaderButton.propTypes = {
  Icon: PropTypes.func,
  iconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  variant: PropTypes.string,
};

HeaderButton.defaultProps = {
  Icon: null,
  iconColor: white,
  variant: VARIANTS.PRIMARY,
};

export { HeaderButton };
