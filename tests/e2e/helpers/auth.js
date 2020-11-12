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
 * @fileoverview Common auth actions to facilitate testing
 * @author Gabriel Womble
 */
import {
  auth,
  common,
  routes,
} from 'e2e/constants';

const { values } = common;

/**
 * Helper to signup in E2E tests
 * @param {Class} page - puppeteer page class
 */
export const signup = (async (page) => {
  await page.goto(routes.signup);
  await page.waitForSelector(auth.selectors.page.attr);
  await page.waitForSelector(auth.selectors.formSignup.attr);
  await page.type(auth.selectors.username.attr, values.username);
  await page.type(auth.selectors.password.attr, values.password);
  await page.type(auth.selectors.confirm.attr, values.password);
  await page.click(auth.selectors.tos.attr);
  await page.click(auth.selectors.btnPrimary.attr);
});

/**
 * Helper to login in E2E tests
 * @param {Class} page - puppeteer page class
 */
export const login = (async (page) => {
  await page.goto(routes.login);
  await page.waitForSelector(auth.selectors.page.attr);
  await page.waitForSelector(auth.selectors.formLogin.attr);
  await page.type(auth.selectors.username.attr, values.username);
  await page.type(auth.selectors.password.attr, values.password);
  await page.click(auth.selectors.btnPrimary.attr);
});

/**
 * Helper to logout in E2E tests
 * @param {Class} page - puppeteer page class
 */
export const logout = (async (page) => {
  await page.goto(routes.login);
});
