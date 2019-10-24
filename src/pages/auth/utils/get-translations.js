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
  const commonMessages = {
    password: formatMessage(AUTH.PASSWORD),
    tosPrompt: AUTH.TOS_PROMPT,
    tosSubTitle: formatMessage(AUTH.TOS_SUBTITLE),
    tos: formatMessage(AUTH.TOS),
  };

  if (type === LOGIN) {
    return {
      username: formatMessage(AUTH.USERNAME),
      btnSecondary: formatMessage(AUTH.SIGNUP),
      btnPrimary: formatMessage(AUTH.LOGIN),
      ...commonMessages,
    };
  }

  return {
    username: formatMessage(AUTH.DESIRED_USERNAME),
    confirmPassword: formatMessage(AUTH.CONFIRM_PASSWORD),
    btnSecondary: formatMessage(COMMON.CANCEL),
    btnPrimary: formatMessage(AUTH.SIGNUP),
    ...commonMessages,
  };
}
