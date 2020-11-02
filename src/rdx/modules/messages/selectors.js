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
// import { get } from 'lodash';
import { createSelector } from 'reselect';
import {
  LOGIN_FORM,
  INVITE_USER_FORM,
  REGISTER_PASSWORD_FORM,
} from 'rdx/modules/messages/constants';

const getLatestMessageEvt = state => state.latestMessageEvent || {};

const filterMessageByTarget = target => createSelector(
  getLatestMessageEvt,
  (latestMessage) => {
    if (latestMessage.target === target) {
      return latestMessage;
    }
    return {};
  },
);

const selectors = {
  getLatestMessageEvt,
  getGenericMessageEvt: filterMessageByTarget(undefined),
  getLatestLoginMessageEvt: filterMessageByTarget(LOGIN_FORM),
  getInviteUserMessage: filterMessageByTarget(INVITE_USER_FORM),
  getRegistrationMessage: filterMessageByTarget(REGISTER_PASSWORD_FORM),
};

export default selectors;
