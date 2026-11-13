const { Before, AfterStep, Status } = require('@cucumber/cucumber');
const playwright = require('@playwright/test');//playwright keeword is used to access the browser object in the step definition file
const {POManager} = require('../../pageObjects/POManager');



Before(async function () {
    // This hook will be executed before all scenarios
    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

AfterStep(async function ({result}) {
    if(result.status === Status.FAILED){
        await this.page.screenshot({path: `features/cuScreenshots/${Date.now()}.png`, fullPage: true});
    }
})

