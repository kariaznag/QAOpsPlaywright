const {test, expect } = require('@playwright/test');
const {HelperEX} = require('../Utils/HelperEX.js');


const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
const  API_URL = BASE_URL + "/api";


const userGmail = "karima.aznagg@gmail.com";
const userYahoo = "karima.aznagg@yahoo.com";
const myYahooPassword = "Chocolata9*";
const myGmailPassword = "Domtomsalimin8*";

let token;

test("Cross_User_Booking_Access_Denied", async ({ page, request }) => {

    // Log in as user with Yahoo
    const response = await request.post(`${API_URL}/auth/login`, {
        data: {
            email: userYahoo,
            password: myYahooPassword
        },
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    token = body.token;

    //get the first event ID from the events API
   const eventResp = await request.get(`${API_URL}/events`, 
         {
        headers : {Authorization: `Bearer ${token}`},
        });
    expect(eventResp.ok()).toBeTruthy();
    const eventId = (await eventResp.json()).data[0].id;
    console.log("The first Event ID: " + eventId);

     // Create a booking for the event using the Yahoo user
    const bookingResp = await request.post(`${API_URL}/bookings`, {
        headers :{Authorization: `Bearer ${token}`},
        data : {
            eventId : eventId,
            customerName : "Test kari",
            customerEmail : userYahoo,
            customerPhone : "+91-9876543210",
            quantity : 1,
                }
            }
    );
    expect(bookingResp.ok()).toBeTruthy();
    const dataId = (await bookingResp.json()).data.id;
    console.log("Booking ID created by Yahoo user: " + dataId);
    await request.dispose(); // Dispose of the API context after use to free up resources

    // Log in as Gmail user via browser UI
    const helper = new HelperEX(page, userGmail, myGmailPassword);
    await helper.loginAs();

    //go to the bookings page and try to access the booking created by Yahoo user
    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${dataId}`);

    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking.')).toBeVisible();
})