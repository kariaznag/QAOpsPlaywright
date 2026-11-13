const { test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils.js');

const loginPayload = {userEmail: "karima.aznagg@gmail.com", userPassword: "Chocolata*90"};
const orderPayload = {orders:[{country:"Morocco",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakeOrderPlayload = {data:[],message:"No Orders"};//this is a JS object, but the response we get from the API is a string. So we need to convert this object into a string using JSON.stringify() method.

let response;

test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});



test('Network Interception', async ({ page }) => {

    //set the token in the application parameters in the local storage of the browser context
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);}, response.token);

    await page.goto('https://rahulshettyacademy.com/client');


    //this route method should always be called before the action that triggers the network call, otherwise it will not work.
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
        async route =>{//the route or link in the first argument is stocked in the route.request variable.
            // the normal lifecycle of an api response : API will give back response --> give it to the browser --> render the data on the front end (UI)
            //in the following, we will beintercepting the response : that means, before the response is sent to the browser, we will hijack the response.
            //API will give back response -->  {we will give a fake response with the route} --> give it to the browser --> render the data on the front end (UI)

            const response = await page.request.fetch(route.request());//fetch is gonna give us the response of the request.
            console.log(await response.json());

            let body = JSON.stringify(fakeOrderPlayload);
            console.log(body);

            //fulfill means well be sending the response we fetched with the modification of the only the body and the response.
            route.fulfill(
                                {
                    response,
                    body,
                }
            )
            }
    )

    
     //the following line will trigger the network call, and the route method will be called before the network call is made.
    await page.locator("[routerlink*='myorders']").click();//here playwright will listen to the network call and if the request url matches the url we have provided in the route, it will hijack the response and send the fake response to the browser.
    
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());

   

});
