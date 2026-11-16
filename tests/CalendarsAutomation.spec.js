const {test, expect} = require('@playwright/test');

test('calendars' , async ({page}) => {

    const date = "4";
    const month = "6";
    const year = "2027";
     

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    const monthName = ((await page.locator(".react-calendar__navigation__label").textContent()) || "").split(" ")[0];
    await page.locator("[aria-label*= '"+monthName+" "+date+"']").click();
    //calendar test changes in azkari_fixes branch
    
    await expect(page.locator('.react-date-picker__inputGroup input[name="date"]').getAttribute('value')).resolves.toContain(year+"-0"+month+"-0"+date);//we can also use .inputValue() instead of getAttribute('value') to get the value of the input field
    

});

