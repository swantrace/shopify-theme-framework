import puppeteer from 'puppeteer';
import { range } from '../../src/helpers';

test('should output an array', () => {
  const arr = range(1, 10);
  expect(arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('Validating first name field', async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
  });
  const page = await browser.newPage();
  await page.goto('https://qixuan.myshopify.com/collections/mens');
}, 100000);
