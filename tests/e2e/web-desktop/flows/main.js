import { main, routes } from 'e2e/constants';

export const mainTest = (async (page, expect) => {
  await page.goto(routes.base);
  await page.waitForSelector(main.selectors.test.attr);
  await expect(page).toMatch('Welcome to your React App');
});
