const base = require('@playwright/test');
const {request} = require('@playwright/test');
const {APIUtils} = require('./APIUtils.js');

const loginPayload = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayload = {orders:[{country:"Morocco",productOrderedId:"6960eac0c941646b7a8b3e68"}]};


//when using this customTest, the entire bloc od instructions will be executed
//and watever is rapped inside the use() function will be sent back
exports.customTest = base.test.extend(
    {//all fixtures need to be inside curly braces
authenticatedPage : async({browser}, use)=>{//use is to send the authenticated page back.
         const context = await browser.newContext();
         const page = await context.newPage();
         await page.goto("https://rahulshettyacademy.com/client");
         await page.locator("#userEmail").fill("anshika@gmail.com");
         await page.locator("#userPassword").fill("Iamking@000");
         await page.locator("[value='Login']").click();
         await page.waitForLoadState('networkidle');
         await use(page);//returns an authenticated page 
         //tear down, is whats gonna be executed after the use() function is done executing, so we can close the context here.
         await context.close();
    },

    createOrder : async({authenticatedPage}, use)=>{
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayload);
        const response = await apiUtils.createOrder(orderPayload);
        await use(response);
    },

    //a java script object
    testDataForOrder : {
        productName : 'ADIDAS ORIGINAL'
    }
}    
);

