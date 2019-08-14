import { main, routes } from 'e2e/constants';

export const mainTest = (async (page) => {
  await page.goto(routes.base);
  await page.waitForSelector(main.selectors.test.attr);
});
