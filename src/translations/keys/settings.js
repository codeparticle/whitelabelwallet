/**
 * @fileoverview Intl Messages for the Settings page
 * @author Gabriel Womble
 */
import { defineMessages } from 'react-intl';

export const SETTINGS = defineMessages({
  CHANGE_USERNAME: {
    id: 'settings.change_username',
    description: 'Change Username label',
    defaultMessage: 'Change Username',
  },
  CHANGE_PASSWORD: {
    id: 'settings.change_password',
    description: 'Change Password Label',
    defaultMessage: 'Change Password',
  },
  CURRENT_PASSWORD: {
    id: 'settings.current_password',
    description: 'Current password label',
    defaultMessage: 'Current Password',
  },
  NEW_PASSWORD: {
    id: 'settings.new_password',
    description: 'New password label',
    defaultMessage: 'New Password',
  },
  CONFIRM_NEW_PASSWORD: {
    id: 'settings.confirm_new_password',
    description: 'Confirm new password label',
    defaultMessage: 'Confirm New Password',
  },
  ENABLE_DARK_MODE: {
    id: 'settings.enable_dark_mode',
    description: 'Enable dark mode label',
    defaultMessage: 'Enable dark mode?',
  },
});