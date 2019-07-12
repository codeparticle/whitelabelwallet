import flows from './flows';
import puppeteer from 'puppeteer';
import expect from 'expect-puppeteer';
import { setDefaultOptions } from 'expect-puppeteer';

setDefaultOptions({ timeout: 20000 });

const chromeArgs = [
  '--no-sandbox', '--disable-setuid-sandbox', '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding',
];

let browser;
let page;
const timeout = 15000;

const guiMode = {
  args: chromeArgs,
  headless: false,
  devtools: false,
};
const noGui = {
  args: chromeArgs,
  headless: true,
};

const useGui = (arg) => {
  return arg === true ? guiMode : noGui;
};

beforeAll(async () => {
  browser = await puppeteer.launch(useGui(!process.env.NODE_E2E_NO_GUI));
  page = await browser.newPage();
  page.emulate({
    viewport: {
      width:  1100,
      height: 800,
    },
    userAgent: '',
  });
});

afterAll(async () => {
  await browser.close();
});

const puppetHandle = (async (testSubject, testToRun, delay = 500) => {
  it(testSubject, async () => {
    if (delay > 0) {
      await page.waitFor(delay);
    };
    return testToRun(page, expect);
  }, (timeout + delay));
});

describe('Example test', () => {
  puppetHandle('main test', flows.mainTest, 500);
});
