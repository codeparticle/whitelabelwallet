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
