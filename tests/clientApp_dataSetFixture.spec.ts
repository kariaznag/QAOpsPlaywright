import {expect} from '@playwright/test';

//data set is a fixture
import {customTest} from '../Utils_ts/test-base';

import {POManager} from '../pageObjects_ts/POManager';





customTest.skip('@tstesting clientAppPO', async ({ page, testDataForOrder }) => {
   
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
