const { test, expect } = require('@playwright/test');

test('playwrightSpecialLocator', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("rahulshettyacademy");
    await page.getByRole("button", {name: "Submit"}).click();
    await expect(page.locator(".alert-success")).toContainText("Success! The Form has been submitted successfully!.");

});


test('playwright test level timeout', async ({ page }) => {
    
    const slowExpect = expect.configure({ timeout: 9000 });//customize the expect assertion to have a customized timeout and we can use it within this test only when it's needed.
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
   // await page.getByRole('link', { name: /Shop/i }).click();
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.waitForLoadState('networkidle');
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("rahulshettyacademy");
    await page.getByRole("button", {name: "Submit"}).click();
    await slowExpect(page.locator(".alert-success")).toContainText("Success! The Form has been submitted successfully!.");
    
});