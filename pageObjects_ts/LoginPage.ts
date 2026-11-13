import{Page, Locator} from '@playwright/test';

export class LoginPage{

    page : Page;
    signInButton : Locator;
    userEmail : Locator;
    passwordLogin : Locator;

    constructor(page:Page){
        this.page = page; //so that the page will be used and recognised in all this class 
        this.signInButton = page.getByRole("button", {name: "login"});
        this.userEmail = page.getByPlaceholder("email@example.com");
        this.passwordLogin = page.getByPlaceholder("enter your passsword");

    }

    // a goto meter
    async goToLogin(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    //a custom meter
    async ValidLogin(email: string, password: string){
         await this.userEmail.fill(email);
         await this.passwordLogin.fill(password);
         await this.signInButton.click();
    //   await this.page.waitForLoadState('networkidle'); //--> didnt work using webkit
         await this.page.locator(".card-body").first().waitFor({ state: "visible" });
    }

}

