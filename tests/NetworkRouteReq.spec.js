const { test, expect } = require('@playwright/test');

test('Security test request intercept' , async ({page}) =>{

    //login 
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("karima.aznagg@gmail.com");
    await page.locator("#userPassword").fill("Chocolata*90");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    //Reach the orders page
    await page.locator("[routerlink*='myorders']").click();
    await page.locator('tbody .ng-star-inserted').first().waitFor();

    //well test if the interception is not allowed by the app and that the info are not accessible for other users
    //Continue is used to intercet the request calls to modify it.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
         route => route.continue({url : "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=k485774y45nh1452785jr48l"}))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('p.blink_me')).toHaveText("You are not authorize to view this order");
});

