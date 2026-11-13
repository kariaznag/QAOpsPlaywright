import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/');
  await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
  await page.getByRole('button', { name: 'ADD TO CART' }).nth(2).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).nth(4).click();
  await page.locator('div:nth-child(12) > .product-action > button').click();
  await page.locator('div:nth-child(14) > .product-action > button').click();
  await expect(page.getByRole('rowgroup')).toContainText('5');
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
  await expect(page.getByRole('heading', { name: 'Brocolli - 1 Kg' })).toBeVisible();
  await expect(page.locator('.discountAmt')).toContainText('298');
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('combobox').selectOption('Morocco');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await expect(page.locator('#root')).toContainText('Thank you, your order has been placed successfully You\'ll be redirected to Home page shortly!!');
});