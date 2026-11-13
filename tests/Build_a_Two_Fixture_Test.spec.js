const {testHelper} = require('../Utils/ExFixtures');
const {expect} = require('@playwright/test');

testHelper("Build a Two-Fixture Test", async ({authenticatedPage, createEvent})=>{
    //get the title of the event created from the createEvent fixture
    //const eventTitlecreated = createEvent.data.title;
    //land on the events page
    await authenticatedPage.goto('https://eventhub.rahulshettyacademy.com/events');
    //assert that the event created is visible on the events page
    await expect(authenticatedPage.getByRole('heading', { name: createEvent.data.title })).toBeVisible();

});