// @ts-check
//import { defineConfig, devices } from '@playwright/test';
const { defineConfig } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  //retries : 1, //the failed tests will rerun once
  //workers : 1,
  //fullyParallel: true,//not used in case of tests interdependent 

  //general timeout is 40 seconds, if the test is stuck somewhere we gonne wait 40 seconds
  timeout : 600 *1000,
  //specifically, the timeout for the expect assertion is 5000
  expect:{
    timeout : 50000,
  },
  reporter :'html',
  use: {
    
    browserName : 'chromium',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless : false,
    screenshot : 'on',//'only-on-failure'
    trace: 'on', // 'retain-on-failure' if we want to keep the trace for failed tests, 'on' if we want to keep the trace for all tests

  },
  
});

module.exports = config;
