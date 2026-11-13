import {test, expect} from '@playwright/test';
import {POManager} from '../pageObjects_ts/POManager';

//convert json data --> string --> JS object
const dataSet = JSON.parse(JSON.stringify(require('../Utils_ts/clientApp_POImpTestData.json')));

test('@Smoke @tstesting clientAppPO', async ({ page }) => {
   
//Use the page object manager we created to centralizes the access of page objects
   const poManager = new POManager(page);
//call the page object we created to login via the poManager 
   const loginPage = poManager.getLoginPage(); 
   await loginPage.goToLogin();
//we use the eamil and password we stocked in the dataSet object
   await loginPage.ValidLogin(dataSet.email, dataSet.password);

//Search product and add to cart
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddcart(dataSet.productName);
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
