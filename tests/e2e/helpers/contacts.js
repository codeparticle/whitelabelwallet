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
 * @fileoverview Helpers related to the contacts plugin
 * @author Gabriel Womble
 */

import { contacts } from 'e2e/constants';

/**
  @typedef ContactE2EParam
  @type {Object}
  @property {string} name - contact's name
  @property {string} address - contact's address
  @property {string} desc - optional contact description
*/

/**
 * Function that creates a given contact
 * @param {Class} page - the puppeteer page class
 * @param {ContactE2EParam} contact - the contact to be created
 */
const createContact = (async (page, contact) => {
  const { name, address, desc = '' } = contact;
  // Open sidepanel
  await page.click(contacts.selectors.addBtn.attr);
  await page.waitForSelector(contacts.selectors.sidepanel.attr);

  await page.type(contacts.selectors.nameInput.attr, name);
  await page.type(contacts.selectors.addressInput.attr, address);

  if (desc) {
    await page.type(contacts.selectors.descInput.attr, desc);
  }

  await page.click(contacts.selectors.sidepanelBtn.attr);
});

export { createContact };
