const {test, expect} = require('@playwright/test');


test('webappE2E1', async ({ page }) => {
   
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("karima.aznagg@gmail.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("Domtomsalimin8*");
   await page.getByRole("button", {name: "login"}).click();
   await products.filter({ hasText: productName }).getByRole("button", {name: "Add To Cart"}).click();
   await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
   
   await page.locator("div li").first().waitFor();//well wait for the first element to load in the cart page
   await page.locator(".btn:has-text('Checkout')").click();
   await page.getByPlaceholder('Select Country').pressSequentially("Mor", { delay: 150 }) 
   await page.getByRole("button", {name: " Morocco"}).click();
   await page.getByText("Place Order ").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thank you for the order. ", {timeout: 10_000});//wait for the text to appear in the page for 10 seconds
});
