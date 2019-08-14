/**
 * @fileoverview Func to determine authpage type
 * @author Gabriel Womble
 */
import { AUTH_CONSTANTS } from 'lib/constants';
const { LOGIN, SIGNUP } = AUTH_CONSTANTS;

export const getType = path => path === `/${LOGIN}` ? LOGIN : SIGNUP;
