const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageObjects/POManager');
//convert json data --> string --> JS object
const dataSet = JSON.parse(JSON.stringify(require('../Utils/clientApp_MultiDSTestData.json')));
//data set is a fixture
const {customTest} = require('../Utils/test-base');

//the dataSet here is an array of data sets 
//we'll be running the test twice with each data set 
for(const data of dataSet){

test(`clientApp_MultiDatasets for ${data.productName}`, async ({ page }) => {
   
//Use the page object manager we created to centralizes the access of page objects
   const poManager = new POManager(page);
//call the page object we created to login via the poManager 
   const loginPage = poManager.getLoginPage(); 
   await loginPage.goToLogin();
//we use the eamil and password we stocked in the dataSet object
   await loginPage.ValidLogin(data.email, data.password);

//Search product and add to cart
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddcart(data.productName);
   await dashboardPage.gotoCart();

//checkout page
   await page.locator("div li").first().waitFor();//well wait for the first element to load in the cart page
   const checkoutPage = poManager.getCheckoutPage();
   await checkoutPage.goToCheckout();
   await checkoutPage.fillinfo("Morocco");
   await checkoutPage.placeOrder();

//assert if order placed successfully 
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
});
   
}

customTest('clientAppPO', async ({ page, testDataForOrder }) => {
   
//Use the page object manager we created to centralizes the access of page objects
   const poManager = new POManager(page);
//call the page object we created to login via the poManager 
   const loginPage = poManager.getLoginPage(); 
   await loginPage.goToLogin();
//we use the eamil and password we stocked in the dataSet object
   await loginPage.ValidLogin(testDataForOrder.email, testDataForOrder.password);

//Search product and add to cart
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddcart(testDataForOrder.productName);
   await dashboardPage.gotoCart();

//checkout page
   await page.locator("div li").first().waitFor();//well wait for the first element to load in the cart page
   const checkoutPage = poManager.getCheckoutPage();
   await checkoutPage.goToCheckout();
   await checkoutPage.fillinfo("Morocco");
   await checkoutPage.placeOrder();

//assert if order placed successfully 
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
});
