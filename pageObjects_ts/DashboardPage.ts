import{Page, Locator} from '@playwright/test';

export class DashboardPage{

    page : Page;
    products : Locator;
    producttexts : Locator;
    cart : Locator;

    constructor(page:Page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.producttexts = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
    }


    async searchProductAddcart(productName: string){
        const titles = await this.producttexts.allTextContents();
        console.log(titles);
        const count = await this.products.count();
   for(let i=0; i<count; ++i){
    if(await this.products.nth(i).locator("b").textContent() == productName){
        await this.products.nth(i).locator("text= Add To Cart").click();        
        break;
    }
   }
    }

    async gotoCart(){
        await this.cart.click();
    }

}

