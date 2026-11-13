import{LoginPage} from './LoginPage';
import{DashboardPage} from './DashboardPage';
import {CheckoutPage} from './CheckoutPage';
import {Page} from '@playwright/test';


export class POManager{

    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    checkoutPage: CheckoutPage;
    page: Page;

    constructor(page:Page){
        this.page = page;//page is a local parameter. The assignment this.page = page stores that same Playwright page reference on the POManager instance so it can be reused later.
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

}

