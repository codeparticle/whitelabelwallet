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
 * @fileoverview Tests related to authentication in WLW
 * @author Gabriel Womble
 */
import {
  auth,
  common,
  myWallets,
  routes,
} from 'e2e/constants';
import helpers from 'e2e/helpers';

const {
  logout,
} = helpers;

const { values } = common;

export const signupTest = (async (page, expect) => {
  await logout(page);
  await page.goto(routes.signup);
  await page.waitForSelector(auth.selectors.formSignup.attr);
  // Fill out signup form and submit
  await expect(page).toFill(auth.selectors.username.attr, `${values.username}1`);
  await expect(page).toFill(auth.selectors.password.attr, values.password);
  await expect(page).toFill(auth.selectors.confirm.attr, values.password);
  await expect(page).toClick(auth.selectors.tos.attr);
  await expect(page).toClick(auth.selectors.btnPrimary.attr);
  await page.waitForSelector(myWallets.selectors.page.attr);
  await expect(page).toMatch(myWallets.values.header);
});

export const loginTest = (async (page, expect) => {
  await logout(page);
  await page.goto(routes.login);
  await page.waitForSelector(auth.selectors.formLogin.attr);

  await expect(page).toFill(auth.selectors.username.attr, values.username);
  await expect(page).toFill(auth.selectors.password.attr, values.password);
  await expect(page).toClick(auth.selectors.btnPrimary.attr);
  await page.waitForSelector(myWallets.selectors.page.attr);
  await expect(page).toMatch(myWallets.values.header);
});
