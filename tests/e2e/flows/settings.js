/**
 * @fileoverview Tests related to the settings panel
 * @author Gabriel Womble
 */
import { common, settings } from 'e2e/constants';

const { selectors, values } = settings;
const { home } = common.selectors;

export const renameUserTest = (async (page, expect) => {
  await page.waitForSelector(home.attr);
  // Open the panel, wait for sidepanel visible
  await page.click(selectors.openBtn.attr);
  await page.waitForSelector(selectors.sidepanel.attr);

  // Change username, and save
  await expect(page).toFill(selectors.username.attr, values.newUsername);
  await expect(page).toClick(selectors.saveBtn.attr);

  // Reopen panel and verify initial value of username input is the new username
  // Must wait for 500ms so puppeteer doesn't click early and inneffectively
  await page.waitFor(500);
  await page.click(selectors.openBtn.attr);
  await page.waitForSelector(selectors.username.attr);
  await expect(page).toMatchElement(`${selectors.username.attr}[value="${values.newUsername}"]`);

  // Undo changes
  await expect(page).toFill(selectors.username.attr, values.currentUsername);
  await expect(page).toClick(selectors.saveBtn.attr);
});

export const changePasswordTest = (async (page, expect) => {
  await page.waitForSelector(home.attr);
  // Open the panel, wait for sidepanel visible
  await page.click(selectors.openBtn.attr);
  await page.waitForSelector(selectors.sidepanel.attr);

  // Toggle password form
  await expect(page).toClick(selectors.changePassword.attr);

  // Fill form
  await expect(page).toFill(selectors.currentPassword.attr, values.currentPassword);
  await expect(page).toFill(selectors.newPassword.attr, values.newPassword);
  await expect(page).toFill(selectors.confirmedPassword.attr, values.newPassword);

  // Save changes
  await expect(page).toClick(selectors.saveBtn.attr);

  // Revert changes (thereby verifying changes password)
  await page.waitFor(500);
  await page.click(selectors.openBtn.attr);
  await page.waitForSelector(selectors.sidepanel.attr);

  // Reverting form changes
  await expect(page).toFill(selectors.currentPassword.attr, values.newPassword);
  await expect(page).toFill(selectors.newPassword.attr, values.currentPassword);
  await expect(page).toFill(selectors.confirmedPassword.attr, values.currentPassword);
  await expect(page).toClick(selectors.saveBtn.attr);
});

export const toggleThemeTest = (async (page, expect) => {
  await page.waitForSelector(home.attr);
  // Open the panel, wait for sidepanel visible
  await page.click(selectors.openBtn.attr);
  await page.waitForSelector(selectors.sidepanel.attr);

  // Toggle theme
  await expect(page).toClick(selectors.themeToggle.attr);

  // Save changes
  await expect(page).toClick(selectors.saveBtn.attr);

  // Verify changes by matching value of input
  await page.waitFor(500);
  await page.click(selectors.openBtn.attr);
  await page.waitForSelector(selectors.sidepanel.attr);
  await expect(page).toMatchElement(selectors.themeToggleTrue.attr);
});