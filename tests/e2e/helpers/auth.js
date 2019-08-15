/**
 * @fileoverview Common auth actions to facilitate testing
 * @author Gabriel Womble
 */
import {
  auth,
  common,
  main,
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
  await page.waitForSelector(main.selectors.logout.attr);
  await page.click(main.selectors.logout.attr);
  await page.waitForSelector(auth.selectors.page.attr);
});
