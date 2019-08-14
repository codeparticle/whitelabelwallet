/**
 * @fileoverview Function to handle auth validation
 * TODO (next PR): Error handling using intl messages + codeparticle/formal
 * @author Gabriel Womble
 */
import jwt from 'jsonwebtoken';
import { environment } from 'lib/utils/environment';
import { AUTH_CONSTANTS } from 'lib/constants';

const { LOGIN, SIGNUP } = AUTH_CONSTANTS;
const { secret } = environment;

export async function validateAuth({
  username,
  password,
  confirmPassword,
  accepted,
  type,
  manager,
}) {
  // For now just using bool for error, will update to error keys in follow-up PR
  const validationState = {
    token: '',
    hasError: true,
  };

  // Separated conditions for follow up error consts
  if (!username || !password) {
    return validationState;
  }

  if (type === SIGNUP) {
    if (!accepted) {
      return validationState;
    }

    if (password !== confirmPassword) {
      return validationState;
    }
  }

  const exists = await manager.checkDatabaseExists(username, password);

  if (exists && type === SIGNUP) {
    return validationState;
  };

  if (!exists) {
    if (type === LOGIN) {
      return validationState;
    }

    await manager.generateDatabase();
    await manager.saveDatabase(username, password);
  }

  return await manager.loadDatabase(username, password).then((loaded) => {
    if (loaded) {
      validationState.hasError = false;
      validationState.token = jwt.sign({
        data: username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // One hour to expire
      }, secret);
    }

    return validationState;
  });

}
