const {test, expect} = require('@playwright/test');

test.describe.configure({mode : "serial"});//serial mode guarantees that each test must be a success before going to the next test if not the test will stop

test('@Smoke Popup validations', async ({page}) => {
    
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //await page.goto('https://google.com/');
    //await page.goBack();
    //await page.goForward();    
    await expect(page.locator('#displayed-text')).toBeVisible();
    await await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.locator('#name').fill('Dora');
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#mousehover').hover();//to hover the mouse over the element
    await page.frameLocator('#courses-iframe').locator('li a[href*="lifetime-access"]:visible').click();
});

test("Screnshot and Visual comparison", async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');    
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'screenshots/partialScreenshot2.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshots/screenshot1.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();

});

test.describe('Visual testing', ()=>{//we described this test suite as Visual testing and well apply parallel mode execution for only this group
    test.describe.configure('parallel')


  test('Visual testing', async({page}) => {
    await page.goto('https://www.rediff.com/');
  //await expect(await page.screenshot({ path: 'screenshots/myNowScreenshot.png' })).toMatchSnapshot('myLastscreenshot.png');  
    await expect(await page.screenshot({ path: 'screenshots/myNowScreenshot.png' }))
        .not.toMatchSnapshot('myLastscreenshot.png');

});


test('Visual testing 2', async({page}) => {
    await page.goto('http://www.google.com/');
    expect(await page.screenshot()).not.toMatchSnapshot({ path: 'myScreenshot.png' });
});
});

