const { test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils.js');

const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayload = {orders:[{country:"Morocco",productOrderedId:"6960eac0c941646b7a8b3e68"}]};

let response;

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    await apiContext.dispose();// Dispose of the API context after use to free up resources
});



test('@Webst Client App login', async ({ page }) => {

    //set the token in the application parameters in the local storage of the browser context
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);}, response.token)

    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');

    
   await page.locator("[routerlink*='myorders']").click();

   await page.locator('tbody .ng-star-inserted').first().waitFor("visible");
   const orderIds = page.locator('tbody .ng-star-inserted');

   for (let i=0; i< await orderIds.count(); ++i){
    if(response.orderId.includes((await orderIds.nth(i).locator('th').textContent()).trim())){
        console.log('orderId found in the table');
        await orderIds.nth(i).locator('td button').getByText('View').click();
        break;
        }
    }

    await page.waitForLoadState('networkidle');
    await expect(page.locator('.email-title')).toHaveText('order summary');

});
