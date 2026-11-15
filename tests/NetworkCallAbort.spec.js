const {test} = require('@playwright/test');

//to test if a server is down for example
//we'll abort a network call and see what's the result in the UI

test('@API @Smoke Network call abort', async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();

    //to listen to the request call event to occur and log the url to the console
    page.on('request', request => console.log(request.url()));

    //listen for the response call event from browser-page traffic to occur and log the status code to the console
    page.on('response' , response => console.log(response.status()));
    //page.route('**/*.css', route => route.abort());
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.waitForLoadState('networkidle');

    //to stop the network call for images
    //page.route('**/*.{jpg, jpeg, png}', route => route.abort());

    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    await page.waitForLoadState('networkidle');

    //await page.pause();
    const cardTitles = await page.locator(".card-title a").allTextContents();
    //console.log(await page.locator("[style*='block']").textContent());

    
});