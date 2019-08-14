/**
 * @fileoverview Function to abstract translation boilerplate away from view file
 * @author Gabriel Womble
 */
import { TRANSLATION_KEYS } from 'translations/keys';
import { AUTH_CONSTANTS } from 'lib/constants';

const { LOGIN } = AUTH_CONSTANTS;
const { AUTH, COMMON } = TRANSLATION_KEYS;

/**
 * @returns {Object} - translations
 * @param {func} formatMessage - intl.formatMessage
 * @param {String} type - 'login' or 'signup'
 */
export function getTranslations(formatMessage, type) {
  if (type === LOGIN) {
    return {
      username: formatMessage(AUTH.USERNAME),
      password: formatMessage(AUTH.PASSWORD),
      btnSecondary: formatMessage(AUTH.SIGNUP),
      btnPrimary: formatMessage(AUTH.LOGIN),
    };
  }

  return {
    username: formatMessage(AUTH.DESIRED_USERNAME),
    password: formatMessage(AUTH.PASSWORD),
    confirmPassword: formatMessage(AUTH.CONFIRM_PASSWORD),
    tos: formatMessage(AUTH.TOS_ACCEPTED),
    btnSecondary: formatMessage(COMMON.CANCEL),
    btnPrimary: formatMessage(AUTH.SIGNUP),
  };
}
