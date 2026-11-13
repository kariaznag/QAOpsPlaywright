const { test } = require('@playwright/test');
const {expect} = require('@playwright/test');

//test is an annotation that requires playwright module test to recognise First playwright test as a test
test.skip('First playwright test', async ({browser})=> 
    //async is to execute the steps sequentially 
{
   
    //chrome-plugins/cookiescd 
    const context = await browser.newContext(); //here a browser instance is open 

    // wait until the step we are at is done

    const page = await context.newPage(); //here a new page is created
    
    await page.goto("https://www.youtube.com/");

});

// OR call just the page fixture if we dont have any specific cookies to enter or ...


test.skip('second playwright test', async ({browser})=> //async is to execute the steps sequentially 
{
    const context = await browser.newContext(); //here a browser instance is open 
    const page = await context.newPage();
    const username = page.locator("#username");
    const password = page.locator("#password");
    const login = page.locator("#kc-login");
    const pages = context.pages();
    const quality = page.locator('[name ="CodeQualite"]');

 

    await page.goto("https://astrerh-apache-sso-interne-preprod-sa.prod.isoftcloud.cloud/astre/rh/EcrSommaireRH.jsp");
    //get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Sign in to astre-rh-preprod");
    await username.fill("ASTRE");
    await password.fill("ASTRE");
   /* await page.locator("#kc-login").click();
    console.log(await page.locator("#input-error-password>>span").textContent());
    await expect(page.locator("#input-error-password>>span")).toContainText("Invalid");
    await username.fill(""); //fil("") wil wipe the existant value in the field
    await username.fill("ASTRE");
    await password.fill("ASTRE");*/
    await login.click();
    await expect(page).toHaveTitle("Astre - RH");
    await expect(page.frameLocator("[name='Principal']").locator("body > p:nth-child(3) > a")).toContainText("Veuillez saisir votre nom et votre mot de passe");
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.frameLocator("[name='Principal']").locator("body > p:nth-child(3) > a").click(),
    ]);

    
    await popup.waitForLoadState();
    await expect(popup).toHaveTitle("Connexion à Astre");
    await popup.locator("#hlConnexion").click();
    //fin authentification
    //page d'acceuil visible
    console.log(await page.title());
    await expect(page.frameLocator('[name="Principal"]').getByText('Consulter les alertes', { exact: true })).toBeVisible();
    //await page.waitForLoadState();

    await page.frameLocator('[name="Haut"]').getByRole('link', { name: 'Gestion' }).click();
    await page.frameLocator('[name="Sommaire"]').getByText('Agent', { exact: true }).click();
    await expect(page.frameLocator('[name="Sommaire"]').getByText('Recherche', { exact: true })).toBeVisible();
    await page.frameLocator('[name="Sommaire"]').getByText('Recherche', { exact: true }).click();
    

    //UI Controls
    await page.locator('select[name ="CodeQualite"]').isVisible();
    await page.frameLocator('[name="Principal"]').locator('[name="CodeQualite"]').click();
    await page.frameLocator('[name="Principal"]').locator('[name="CodeQualite"]').selectOption("|01|");
    await page.pause(); //this command opens a playwright inspector for debugging
    


});

test.skip('Child windows handling', async({browser})=>
{
    const context = await browser.newContext(); //here a browser instance is open
    const page = await context.newPage();
    const username = page.locator("#username");
    const password = page.locator("#password");
    const login = page.locator("#kc-login");
    await page.goto("https://astrerh-apache-sso-interne-preprod-sa.prod.isoftcloud.cloud/astre/rh/EcrSommaireRH.jsp");
    console.log(await page.title());
    await expect(page).toHaveTitle("Sign in to astre-rh-preprod");
    await username.fill("ASTRE");
    await password.fill("ASTRE");
    await login.click();
    await expect(page).toHaveTitle("Astre - RH");
    await expect(page.frameLocator("[name='Principal']").locator("body > p:nth-child(3) > a")).toContainText("Veuillez saisir votre nom et votre mot de passe");
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.frameLocator("[name='Principal']").locator("body > p:nth-child(3) > a").click(),
    ]);

    await popup.waitForLoadState();
    await expect(popup).toHaveTitle("Connexion à Astre");
    await popup.locator("#hlConnexion").click();
    console.log(await page.title());
    await expect(page.frameLocator('[name="Principal"]').getByText('Consulter les alertes', { exact: true })).toBeVisible();
    await page.frameLocator('[name="Principal"]').getByText('Consulter les alertes', { exact: true }).click();

    await expect(page.frameLocator('[name="Principal"]').getByRole('link', { href: '/astre/og/astromate/PriListeTraitement.jsp'})).toBeVisible();
    await page.frameLocator('[name="Principal"]').getByRole('link', { href: '/astre/og/astromate/PriListeTraitement.jsp'}).click();


    await page.frameLocator('[name="Principal"]').getByText('traitements terminés.', { exact: false })

    const treatmentsLink = page.frameLocator('[name="Principal"]').locator('a[href*="TraitementId=0000000000000000000000000000000000000920"]');

    //the next two steps must happen simultaneously


   
    const [newPage] = await Promise.all([//we add brackets for [newPage] in case this opens more than one window so the newPage  will be an array that contains all the pages opened
    context.waitForEvent('page'),//listen for any new page
    treatmentsLink.click(),
    ])
    /* if 2 or more pages are opened --> we add a new variable name in the array of pages : [newPage, newPage2, ...]*/

    await expect (newPage.locator('h1').filter({hasText : 'Identifiant'})).toBeVisible();//we use newPage instead of page to go to the new page 
    const myTreatmentsListPresent = await newPage.locator('h1').filter({hasText : 'Identifiant'}).textContent();
    console.log(myTreatmentsListPresent);
    const extractId = myTreatmentsListPresent.split(":")[1];
    console.log(extractId);


});


test.skip('End to End Practice in Astre RH _ not completed', async({browser})=>
{
    const context = await browser.newContext(); //here a browser instance is open
    const page = await context.newPage();
    const username = page.locator("#username");
    const password = page.locator("#password");
    const login = page.locator("#kc-login");


    await page.goto("https://astrerh-apache-sso-interne-preprod-sa.prod.isoftcloud.cloud/astre/rh/EcrSommaireRH.jsp");

    console.log(await page.title());
    await expect(page).toHaveTitle("Sign in to astre-rh-preprod");
    await username.fill("ASTRE");
    await password.fill("ASTRE");
    await login.click();
    await expect(page).toHaveTitle("Astre - RH");
    await expect(page.frameLocator("[name='Principal']").locator("body > p:nth-child(3) > a")).toContainText("Veuillez saisir votre nom et votre mot de passe");
    const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        page.frameLocator("[name='Principal']").locator("body > p:nth-child(3) > a").click(),
    ]);

    await popup.waitForLoadState();
    await expect(popup).toHaveTitle("Connexion à Astre");
    await popup.locator("#hlConnexion").click();
    console.log(await page.title());
    await expect(page.frameLocator('[name="Principal"]').getByText('Consulter les alertes', { exact: true })).toBeVisible();
    await page.frameLocator('[name="Principal"]').getByText('Consulter les alertes', { exact: true }).click();

    await page.frameLocator('[name="Principal"]').getByRole('link', { href: '/astre/og/astromate/PriListeTraitement.jsp'}).isEnabled();
    await page.frameLocator('[name="Principal"]').getByRole('link', { href: '/astre/og/astromate/PriListeTraitement.jsp'}).click();


    await page.frameLocator('[name="Principal"]').getByText('traitements terminés.', { exact: false });

    const currentUser = 'ASTRE';
    const trLocator = page.frameLocator('[name="Principal"]').locator('tr');
    const count = await trLocator.count();
    console.log(count);
    const treatmentName = 'DSN Signalement ADV';
    const treatmentStrat = '08/05/2026';
    let treatmentKO = "";
    let newPage;

    if(count > 0){
        for (let i = 0; i < count; ++i) {
        await page.pause(); //this command opens a playwright inspector for debugging
        let locator_i = trLocator.nth(i); //locator('td.LibGras')
            if ((await locator_i.textContent())?.includes(currentUser)) {
                let found = false;
                for (let j = 0; j < count; ++j) { 

                    const tdTreatement = await trLocator.nth(i + 1).locator('td>a').nth(j);
                    if ((await tdTreatement.textContent())?.includes(treatmentName)) {
                        if((await trLocator.nth(j).locator('td').textContent())?.includes(treatmentStrat)){
                                          const treatmentsLink = trLocator.nth(j).locator('td>a');
                        [newPage] = await Promise.all([
                            context.waitForEvent('page'),
                            treatmentsLink.click(),
                        ]);
                        found = true;
                        await page.pause(); //this command opens a playwright inspector for debugging
                        break;

                        }
                        await page.pause(); //this command opens a playwright inspector for debugging

                    }
                }
                if (found) {
                    console.log("your treatment is found");
                    await page.pause(); //this command opens a playwright inspector for debugging
                    break;
                }
            }
        }
    }    
    await page.pause(); //this command opens a playwright inspector for debugging


    /*if (treatmentKO === "not done" && typeof newPage !== 'undefined') {
        await expect(newPage.locator('b').first()).toContainText('Le traitement est terminé avec succès.');
    }*/

});


test.skip('@Webst Client App login', async ({ page }) => {
    const email = "anshika@gmail.com";
   const productName = 'ADIDAS ORIGINAL';
   const products = page.locator(".card-body");//8 results = 8 products
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   const titles =await page.locator(".card-body b").allTextContents();//like an arraylist of all the products names in the page
   console.log(titles);
   const count = await products.count();
   for(let i=0; i<count; ++i){
    if(await products.nth(i).locator("b").textContent() == productName){
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator("div li").first().waitFor();//because the next isVisible() is not supported by playwright to as a command to wait for by default.
   const bool =await page.locator(".cartSection:has-text('ADIDAS ORIGINAL')").isVisible();
   expect(bool).toBeTruthy();

   await page.locator(".btn:has-text('Checkout')").click();
   await page.getByPlaceholder('Select Country').pressSequentially("Mor", { delay: 150 }) 
   //delay is the time between each letter to be written in the field, we need it to be long enough to let the dropdown list appear before writing the next letter, otherwise the dropdown list will not appear and the next letter will be written without any effect on the dropdown list and we will not be able to select the country we want from the dropdown list because it will not be there in the first place
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const contries_count = await dropdown.locator("button").count();
   console.log(contries_count);

   for(let i=0; i<contries_count; ++i){
    if((await dropdown.locator("button").nth(i).textContent())===" Morocco"){
        await dropdown.locator("button").nth(i).click();
        break;
    }}
    const field = await page.locator("div .field");
    const fields_count = await field.count();
    console.log(fields_count);

    for(let j=0; j<fields_count; ++j){
        if((await field.nth(j).locator("div .title").textContent())==='CVV Code ?'){
            field.nth(j).locator("input").fill("123");
            
            break;
        }}
    console.log(fields_count);


    for(let j=0; j<fields_count; ++j){
        if((await field.nth(j).locator("div .title").textContent())==='Name on Card'){
            field.nth(j).locator("input").fill("anshika");
            break;
        }}

    for(let j=0; j<fields_count; ++j){
        if((await field.nth(j).locator("div .title").textContent())==='Apply Coupon'){
            field.nth(j).locator("input").fill("anshika002");
            break;
        }}
    await page.locator("button:has-text('Apply Coupon')").click();
    await page.locator(".btn:has-text('Place Order')").click();       
    
});


