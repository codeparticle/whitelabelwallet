/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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