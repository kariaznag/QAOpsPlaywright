const base = require('@playwright/test');

const BASE_URL_API = "https://api.eventhub.rahulshettyacademy.com/api";

const myLogins = {email: "karima.aznagg@gmail.com", password: "Domtomsalimin8*"};

const myData = {
                    title: "Sandybelle 2",
                    description : "My event for playwright learning",
                    category : "Workshop",
                    city : "Casablanca",
                    venue : "Hotel Madagascar",
                    eventDate: "2026-12-11T09:00:00.000Z",
                    price : 200,
                    totalSeats: 20,
                    imageUrl : "https://img.magnific.com/free-photo/strate_53876-95298.jpg?semt=ais_test_b&w=740&q=80"
            };


exports.testHelper = base.test.extend(
    {
    authenticatedPage : async({browser}, use)=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
        await page.getByLabel('Email').fill('karima.aznagg@gmail.com');
        await page.getByLabel('Password').fill('Domtomsalimin8*');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.waitForLoadState('networkidle');
        await use(page);
        await context.close();
    },


    createEvent : async({request}, use)=>{
        //get the token from login
        const loginResponse = await request.post(`${BASE_URL_API}/auth/login`, {
                data: myLogins,
            });
        const logBody = await loginResponse.json();
        const token = logBody.token;

        //create an event using the token
        const eventCreatedResp = await request.post(`${BASE_URL_API}/events`, 
            {
                headers : {Authorization: `Bearer ${token}`},
                data : myData
        }
    );

    const newEventBody = await eventCreatedResp.json();
    //returns the body of the response to the test file that called this fixture
    await use(newEventBody);

    //tear down, delete the event created after the test is done executing
    await request.delete(`${BASE_URL_API}/events/${newEventBody._id}`, {
        headers : {Authorization: `Bearer ${token}`},   
})
}
});



        