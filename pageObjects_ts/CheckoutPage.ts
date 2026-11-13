import{Page, Locator} from '@playwright/test';

export class CheckoutPage{

    page : Page;
    checkout : Locator;
    country : Locator;
    order : Locator;

    constructor(page:Page){
        this.page = page;
        this.checkout = page.locator(".btn:has-text('Checkout')");
        this.country = page.getByPlaceholder('Select Country');
        this.order = page.getByText("Place Order ");
    }

    async goToCheckout(){
        await this.checkout.click();
    }

    async fillinfo(mycountry:string){
        await this.country.pressSequentially(mycountry, { delay: 150 });
        await this.page.getByRole("button", {name: mycountry}).click();        
    }

    async placeOrder(){
        await this.order.click();
    }
}


