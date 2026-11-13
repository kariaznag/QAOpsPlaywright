const { test, expect } = require('@playwright/test');

let webContext;

test.beforeAll(async ({ browser })=> {

    //login to the app using UI
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("karima.aznagg@gmail.com");
    await page.locator("#userPassword").fill("Domtomsalimin8*");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    //save the state of the browser context to a json file.
    await context.storageState({path: 'state.json'});
    //create a new browser context with the state of the previous context, so that we can use it in other tests to avoid logging in again and again.
    webContext = await browser.newContext({storageState : 'state.json'});
}
)


test('@API @Webst Client App login', async () => {

   const productName = 'ADIDAS ORIGINAL';

   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");

   const products = await page.locator(".card-body");//8 results = 8 products
   const titles =await page.locator(".card-body b").allTextContents();//like an arraylist of all the products names in the page
   console.log(titles);
   const count = await products.count();
   for(let i=0; i<count; ++i){
    if(await products.nth(i).locator("b").textContent() == productName){
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();//because the next isVisible() is not supported by playwright to as a command to wait for by default.
   const bool = await page.locator(".cartSection:has-text('ADIDAS ORIGINAL')").isVisible();
   expect(bool).toBeTruthy();

   await page.locator(".btn:has-text('Checkout')").click();
   await page.getByPlaceholder('Select Country').pressSequentially("Mor", { delay: 150 }) 
   //delay is the time between each letter to be written in the field, we need it to be long enough to let the dropdown list appear before writing the next letter, otherwise the dropdown list will not appear and the next letter will be written without any effect on the dropdown list and we will not be able to select the country we want from the dropdown list because it will not be there in the first place
   const dropdown = await page.locator(".ta-results");
   await dropdown.waitFor();
   const contries_count = await dropdown.locator("button").count();
   console.log(contries_count);

   for(let i=0; i<contries_count; ++i){
    if((await dropdown.locator("button").nth(i).textContent())===" Morocco"){
        await dropdown.locator("button").nth(i).click();
        break;
    }}
    const field = page.locator("div .field");
    const fields_count = await field.count();
    console.log(fields_count);

    for(let j=0; j<fields_count; ++j){
        if((await field.nth(j).locator("div .title").textContent()==='CVV Code')){
            await field.nth(j).locator("input").fill("123");
            
            break;
        }}
    console.log(fields_count);


    for(let j=0; j<fields_count; ++j){
        if((await field.nth(j).locator("div .title").textContent()==='Name on Card')){
            await field.nth(j).locator("input").fill("anshika");
            break;
        }}

    /*for(let j=0; j<fields_count; ++j){
        if((await field.nth(j).locator("div .title").textContent())==='Apply Coupon'){
            field.nth(j).locator("input").fill("anshika002");
            break;
        }}*/
    //await page.locator("button:has-text('Apply Coupon')").click();
    await page.locator(".btn:has-text('Place Order')").click();       
    
});
