/**
 * @fileoverview Function to handle auth validation
 * @author Gabriel Womble
 */
import jwt from 'jsonwebtoken';
import { environment } from 'lib/utils/environment';
import { AUTH_CONSTANTS } from 'lib/constants';
import { TRANSLATION_KEYS } from 'translations/keys';
import { validateSubmit } from './validate-submit';

const { AUTH } = TRANSLATION_KEYS;
const { LOGIN, SIGNUP } = AUTH_CONSTANTS;
const { secret } = environment;

const {
  INVALID_LOGIN,
  USERNAME_EXISTS,
  UNKNOWN_ERROR,
} = AUTH;

export async function validateAuth({
  username,
  password,
  confirmPassword,
  accepted,
  type,
  manager,
  intl,
}) {
  const error = validateSubmit({
    username,
    password,
    confirmPassword,
    accepted,
    type,
    intl,
  });

  if (error) {
    return error;
  }

  const exists = await manager.checkDatabaseExists(username, password);

  if (exists && type === SIGNUP) {
    return {
      message: USERNAME_EXISTS,
    };
  };

  if (!exists) {
    if (type === LOGIN) {
      return {
        message: INVALID_LOGIN,
        inputErrors: {
          USERNAME: true,
          PASSWORD: true,
        },
      };
    }

    await manager.generateDatabase();
    await manager.saveDatabase(username, password);
  }

  return await manager.loadDatabase(username, password).then((loaded) => {
    if (loaded) {
      return jwt.sign({
        data: username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // One hour to expire
      }, secret);
    }

    return {
      message: UNKNOWN_ERROR,
    };
  });

}
