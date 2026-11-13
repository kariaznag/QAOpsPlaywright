const {test, expect, request} = require('@playwright/test');
const{customTest} = require('../Utils/Fixtures.js');

customTest('fixtures demo', async ({authenticatedPage, createOrder, testDataForOrder})=>{//the fixture will be executed before going inside {the code bloc} 

    //login to application and create order and verify if order is created from history
    await authenticatedPage.goto('https://rahulshettyacademy.com/client');
    await authenticatedPage.locator("[routerlink*='myorders']").click();
    await authenticatedPage.locator('tbody .ng-star-inserted').first().waitFor("visible");
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);
})
