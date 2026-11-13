const {Given, When, Then} = require('@cucumber/cucumber');
const {POManager} = require('../../pageObjects/POManager');
const {expect} = require('@playwright/test');


//in the name of this step {username} and {password} are the parameters we will pass from the feature file
//every step can be used in multiple scenarios with different parameters(differents logins, products, etc..) we provide in the feature file
Given('a login to ecommerce application with {string} and {string}', {timeout : 100*1000}, async function (username, password) {
//call the page object we created to login via the poManager
   const loginPage = this.poManager.getLoginPage(); 
   await loginPage.goToLogin();
   await loginPage.ValidLogin(username, password);
});

When('add {string} to cart', async function (product) {
   const dashboardPage = this.poManager.getDashboardPage();
   await dashboardPage.searchProductAddcart(product);
   await dashboardPage.gotoCart();
});

When('checkout the order and submit the order', async function () {
   await this.page.locator("div li").first().waitFor();//well wait for the first element to load in the cart page
   const checkoutPage = this.poManager.getCheckoutPage();
   await checkoutPage.goToCheckout();
   await checkoutPage.fillinfo("Morocco");
   await checkoutPage.placeOrder();
});

Then('Verify order submmited successfully', async function () {
    await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
});

Given('a login to ecommerce2 application with {string} and {string}', {timeout : 100*1000}, async function (username, password) {
//call the page object we created to login via the poManager
   const userName = this.page.locator('#username');
   const paSSword = this.page.locator('#password');
   const signIn = this.page.locator('#signInBtn');
   await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await userName.type(username);
   await paSSword.type(password);
   await signIn.click();
});


Then('Verify Error message is displayed', async function () {
    await expect(this.page.locator("[style*='block']")).toContainText("Incorrect");
});