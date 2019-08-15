/**
 * @fileoverview AuthButtons for auth page. Uses flex row-reverse for better a11y
 * @author Gabriel Womble
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@codeparticle/whitelabelwallet.styleguide';
import { space4 } from '@codeparticle/whitelabelwallet.styleguide/styles/layout.scss';
import { AUTH_CONSTANTS } from 'lib/constants';
import { auth } from 'e2e/constants';

const { LOGIN, SIGNUP } = AUTH_CONSTANTS;

export function AuthButtons({
  history,
  onSubmit,
  messages,
  type,
}) {
  /**
   * Handles secondary button click.
   * Navigates to /login or /signup based on form type
   */
  function handleSecondaryClick() {
    if (type === SIGNUP) {
      history.push(`/${LOGIN}`);
    } else {
      history.push(`/${SIGNUP}`);
    }
  }

  return (
    <div className="auth-page-buttons">
      <Button
        data-selector={auth.selectors.btnPrimary.raw}
        onClick={onSubmit}
        variant="primary"
      >
        {messages.btnPrimary}
      </Button>
      <Button
        data-selector={auth.selectors.btnSecondary.raw}
        onClick={handleSecondaryClick}
        variant="tertiary"
      >
        {messages.btnSecondary}
      </Button>
      <style jsx>
        {`
          .auth-page-buttons {
            display: flex;
            flex-direction: row-reverse;
            justify-content: space-between;
            margin-top: ${space4};
            width: 100%;
          }
        `}
      </style>
    </div>
  );
}

AuthButtons.propTypes = {
  history: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    LOGIN,
    SIGNUP,
  ]).isRequired,
};
