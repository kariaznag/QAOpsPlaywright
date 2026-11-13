const {test, expect} = require('@playwright/test');

test('Event_Booking' , async ({page}) => {

    const myEvent = 'Sandybelle'; 
    let newPage;
    let availableSeats;
    let seatsLeft;
     
    // Navigate to the EventHub website and log in
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByLabel('Email').fill('karima.aznagg@gmail.com');
    await page.getByLabel('Password').fill('Domtomsalimin8*');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByText('Browse Events →').click();
    await page.waitForLoadState('networkidle');

   //Create new event
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.locator('nav').getByRole('link', { name: 'Manage Events' }).click();
    await page.waitForLoadState('networkidle');
    await page.getByPlaceholder('Event title').fill('Sandybelle');
    await page.getByPlaceholder('Describe the event…').fill('My event for playwright learning');
    await page.locator('#category').selectOption('Workshop');
    await page.locator('#city').fill('Casablanca');
    await page.getByPlaceholder('Venue name & address').fill('Hotel Madagascar');
    await page.getByLabel('Event Date & Time').pressSequentially('08062027');
    await page.keyboard.press('Tab');
    await page.getByLabel('Event Date & Time').pressSequentially('0900AM');
    await page.getByLabel('Price ($)').fill('200');
    await page.locator('#total-seats').fill('20');
    await page.locator('[id="image-url-(optional)"]').fill('https://img.magnific.com/free-photo/strate_53876-95298.jpg?semt=ais_test_b&w=740&q=80');
    //await page.locator('#image-url-(optional)').setInputFiles('https://img.magnific.com/free-photo/strate_53876-95298.jpg?semt=ais_test_b&w=740&q=80');
    await page.getByRole('button', { name: '+ Add Event' }).click();
    await expect(page.locator('text=Event created!')).toBeVisible();
    await page.locator('#nav-home').scrollIntoViewIfNeeded();
    await page.locator('#nav-home').click({ force: true });
    await page.waitForLoadState('networkidle');
    await page.getByText('Browse Events →').click();
    await page.waitForLoadState('networkidle');

    //Book the event
    const events = page.locator('main #event-card');
    for (let i = 0; i < await events.count(); ++i) {
        if (await events.nth(i).getByRole('heading').textContent() === myEvent) {
            await events.nth(i).getByRole('link', { name: 'Book Now' }).click();
            await page.waitForLoadState('networkidle');
            await expect(page.locator('h1')).toContainText('Sandybelle');
            break;
        }
    }

    const eventInfo = page.locator('.items-start').locator('div p');
   

    for(let i = 0; i < await eventInfo.count(); ++i) {
        if((await eventInfo.nth(i).textContent())?.includes('seats')){
            availableSeats = (await eventInfo.nth(i).textContent()).split(' /')[0];
            break;
            }
        }
    
    await expect(page.locator('form [id="ticket-count"]')).toHaveText('1');
    await page.getByLabel('Full Name*').fill('Anshika');
    await page.getByLabel('Email*').fill('anshika@gmail.com');
    await page.getByLabel('Phone Number*').fill('1234567890');

    await page.getByRole('button', { name: 'Confirm Booking' }).click();
            
    await page.getByRole('heading', { name: 'Booking Confirmed!' })
    //await page.getByRole('button', { name: 'Browse More Events' }).click();
    await page.getByRole('button', { name: 'View My Bookings' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator('#nav-events').click();
    await page.waitForLoadState('networkidle');
    await page.reload({ waitUntil: 'networkidle' });

    for (let i = 0; i < await events.count(); ++i) {
        if (await events.nth(i).getByRole('heading').textContent() === myEvent) {
            seatsLeft = (await events.nth(i).getByText('seats available').textContent()).split(' ')[0];
            break;
        }
    }

    await expect(Number(seatsLeft)).toEqual(Number(availableSeats)-1);


});