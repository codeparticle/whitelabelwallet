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
