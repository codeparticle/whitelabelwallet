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
import flows from 'e2e/flows';
import helpers from 'e2e/helpers';
import puppeteer from 'puppeteer';
import expect from 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';

setDefaultOptions({ timeout: 30000 });

const chromeArgs = [
  '--no-sandbox', '--disable-setuid-sandbox', '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding',
];

let browser;
let page;
let signedUp = false;
const timeout = 30000;

const guiMode = {
  args: chromeArgs,
  devtools: true,
  headless: false,
  slowMo: 25,
};
const noGui = {
  args: chromeArgs,
  headless: true,
  slowMo: 25,
};

/**
 * @returns {Object} - puppeteer browser options
 * @param {boolean} arg - true to use gui, false for headless mode
 */
const useGui = (arg) => {
  return arg === true ? guiMode : noGui;
};

/**
 * @param {string} testSubject - descriptor for test
 * @param {function} testToRun - test function
 * @param {number} delay - delay before running test in ms
 */
const puppetHandle = (async (testSubject, testToRun, delay = 1000) => {
  it(testSubject, async () => {
    if (delay > 0) {
      await page.waitFor(delay);
    };
    return testToRun(page, expect);
  }, (timeout + delay));
});

/**
 * Instantiates the browser and page classes
 */
beforeAll(async () => {
  jest.setTimeout(timeout);
  browser = await puppeteer.launch(useGui(!process.env.NODE_E2E_NO_GUI));
  page = await browser.newPage();
  page.setViewport({
    height: 900,
    width: 1400,
    deviceScaleFactor: 1,
  });
});

/**
 * Closes browser after every test has passed
 */
afterAll(async () => {
  await browser.close();
});

/**
 * Authenticates user before each test
 */
beforeEach(async () => {
  if (!signedUp) {
    signedUp = true;
    await helpers.signup(page);
  } else {
    await page.waitFor(500);
    await helpers.login(page);
  }
});

describe('Web E2E', () => {
  describe('Authentication', () => {
    puppetHandle('Signup Test', flows.signupTest);
    puppetHandle('Login Test', flows.loginTest);
  });

  describe('Contacts Plugin', () => {
    puppetHandle('New Contact Test', flows.newContactTest);
    puppetHandle('Edit Contact Test', flows.editContactTest);
    puppetHandle('Delete Contact Test', flows.deleteContactTest);
  });

  describe('Settings Page', () => {
    puppetHandle('Rename User Test', flows.renameUserTest);
    puppetHandle('Change Password Test', flows.changePasswordTest);
    puppetHandle('Toggle Theme Test', flows.toggleThemeTest);
  });
});
