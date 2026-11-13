// @ts-check
//import { defineConfig, devices } from '@playwright/test';
const { defineConfig, devices } = require('@playwright/test');

/*
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  //retries : 1, //the failed tests will rerun once
  //general timeout is 40 seconds, if the test is stuck somewhere we gonne wait 40 seconds
  timeout : 60 *1000,

  //specifically, the timeout for the expect assertion is 5000
  expect:{
    timeout : 50000,
  },
  reporter :'html',


  //we can also have multiple configs in the same file by having multiple projects
  projects:[
    //first project 'safari execution'
    {
      name : 'safari',
      use: {
    browserName : 'webkit',//uses Safari engine
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless : true,
    screenshot : 'on',
    trace: 'on', // 'retain-on-failure' if we want to keep the trace for failed tests, 'on' if we want to keep the trace for all tests
    //...devices['iPhone 11'],//give the device name and playwright will decide which dimensions he will set for test
    
  }
    },
    //second project 'chrome execution
    {
      name : 'chrome',
       use: {
    browserName : 'chromium',//uses Safari engine
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless : false,
    screenshot : 'on',
    video : 'on',
    ignoreHttpsErrors : true,//to bypass ssl errors if the website is not ssl certified
    permissions:['geolocation'],//set permissions, for example allowing the browser to access to your location
    trace: 'on', // 'retain-on-failure' if we want to keep the trace for failed tests, 'on' if we want to keep the trace for all tests
    //viewport : {width:720, height: 720},//for web responsive testing, for example test an app if its mobile freindly, we specify dimensions for playwright
    //...devices['Galaxy A55']
    
  }
    }
  ]

});

module.exports = config;

