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

  const exists = await manager.setUser(username, password).checkDatabaseExists();

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
    await manager.saveDatabase();
  }

  return await manager.loadDatabase().then((loaded) => {
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
