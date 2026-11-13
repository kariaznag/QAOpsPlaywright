class HelperEX{

    constructor(page, email, password){
        this.page = page;
        this.email = email;
        this.password = password;
    }


async loginAs(){
        await this.page.goto("https://eventhub.rahulshettyacademy.com");
        await this.page.getByLabel('Email').fill(this.email);
        await this.page.getByLabel('Password').fill(this.password);
        await this.page.getByRole('button', { name: 'Sign in' }).click();
        await this.page.getByText('Browse Events →').click();
    }

}

module.exports={HelperEX};