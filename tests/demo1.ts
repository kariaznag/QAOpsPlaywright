import {expect, type Page, type Locator} from '@playwright/test';
///TYPING
//Variables
let messagets : String = "Hello";
messagets = "bye";
let agets : number = 2;
let numbersts : number[] = [1,2,3];
let data : any =  "this variable'type is not known yet";//reacts like js
data = 42;

console.log(messagets, agets, data);

//Functions
function add1(a:number, b:number):number
{
    return a+b;
}

console.log(add1(3,4));

//objects
let user1: {name: string, age:number} = {name: "Bob", age:34};

user.location = "Fes";//if we compile it to js it will give us correct js code

//this object will look like follows in a ts code
let user2: {name: string, age:number, location:string} = {name: "Bob", age:34, location:"Tangier"};

user2.location = "Fes";

//classes

class CheckoutPage{

    page: Page;
    checkout : Locator;
    country : Locator;
    order : Locator;
    constructor(page: any){
        this.page = page;
        this.checkout = page.locator(".btn:has-text('Checkout')");
        this.country = page.getByPlaceholder('Select Country');
        this.order = page.getByText("Place Order ");
    }

    async goToCheckout(){
        await this.checkout.click();
    }

    async fillinfo(mycountry:any){
        await this.country.pressSequentially(mycountry, { delay: 150 });
        await this.page.getByRole("button", {name: mycountry}).click();        
    }

    async placeOrder(){
        await this.order.click();
    }
}


module.exports = {CheckoutPage};
