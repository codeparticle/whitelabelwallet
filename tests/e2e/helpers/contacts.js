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
