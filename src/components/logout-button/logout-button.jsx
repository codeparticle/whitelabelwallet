/**
 * @fileoverview LogoutButton used in settings module
 * @author Gabriel Womble
 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Button, useMedia } from '@codeparticle/whitelabelwallet.styleguide';
import { COMMON } from 'translations/keys/common';
import { VARIANTS } from 'lib/constants';
import { useManager } from 'lib/hooks';
import { getRdxActionMapper } from 'rdx/utils/props-mapping';

const { LOGOUT } = COMMON;
const { FULL, SLATE } = VARIANTS;

function LogoutButtonView({ intl: { formatMessage }, logout }) {
  const { isMobile } = useMedia();
  const manager = useManager();

  const btnVariant = SLATE;
  const btnSize = isMobile ? FULL : '';
  const btnMessage = formatMessage(LOGOUT);

  function onClick() {
    manager.reset();
    logout();
  }

  return (
    <Button
      onClick={onClick}
      variant={btnVariant}
      size={btnSize}
    >
      {btnMessage}
    </Button>
  );
}

LogoutButtonView.propTypes = {
  intl: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const actionsMapper = getRdxActionMapper([
  'logout',
]);

export const LogoutButton = connect(null, actionsMapper)(injectIntl(LogoutButtonView));
