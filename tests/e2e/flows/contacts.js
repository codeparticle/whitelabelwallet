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
 * @fileoverview Tests related to the contacts plugin
 * @author Gabriel Womble
 */
import {
  common,
  contacts,
} from 'e2e/constants';
import helpers from 'e2e/helpers';

const { createContact, formatDescendantSelector } = helpers;

export const newContactTest = (async (page, expect) => {
  await page.click(common.selectors.pluginContacts.attr);
  await page.waitForSelector(contacts.selectors.page.attr);
  // Open sidepanel
  await expect(page).toClick(contacts.selectors.addBtn.attr);
  await page.waitForSelector(contacts.selectors.sidepanel.attr);
  // Fill form fields
  await expect(page).toFill(contacts.selectors.nameInput.attr, contacts.values.newContact.name);
  await expect(page).toFill(contacts.selectors.addressInput.attr, contacts.values.newContact.address);
  await expect(page).toFill(contacts.selectors.descInput.attr, contacts.values.newContact.desc);
  // Save
  await expect(page).toClick(contacts.selectors.sidepanelBtn.attr);
  // Verify
  await page.waitForSelector(contacts.selectors.page.attr);
  await expect(page).toMatch(contacts.values.newContact.name);
});

export const editContactTest = (async (page, expect) => {
  await page.click(common.selectors.pluginContacts.attr);
  await page.waitForSelector(contacts.selectors.page.attr);
  // Open sidepanel
  await expect(page).toClick(contacts.selectors.editBtn.attr);
  await page.waitForSelector(contacts.selectors.sidepanel.attr);
  // Edit form firleds
  await expect(page).toFill(contacts.selectors.nameInput.attr, contacts.values.editedContact.name);
  await expect(page).toFill(contacts.selectors.addressInput.attr, contacts.values.editedContact.address);
  await expect(page).toFill(contacts.selectors.descInput.attr, contacts.values.editedContact.desc);
  // Save
  await expect(page).toClick(contacts.selectors.sidepanelBtn.attr);
  // Verify
  await page.waitForSelector(contacts.selectors.page.attr);
  await expect(page).toMatch(contacts.values.editedContact.name);
});

export const deleteContactTest = (async (page, expect) => {
  const parentSelector = `${contacts.selectors.contactList.attr} ${contacts.selectors.contact.attr}`;
  const descendantSelector = contacts.selectors.editBtn.attr;

  const secondEditBtn = formatDescendantSelector(parentSelector, descendantSelector, 2);
  // Create contact to delete
  await page.click(common.selectors.pluginContacts.attr);
  await page.waitForSelector(contacts.selectors.page.attr);
  await createContact(page, contacts.values.deletedContact);
  // Open sidepanel
  await page.$eval(secondEditBtn, elem => elem.click());
  await page.waitForSelector(contacts.selectors.sidepanel.attr);
  // Delete
  await expect(page).toClick(contacts.selectors.deleteBtn.attr);
});
