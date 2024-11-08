import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  // Confuguración adicional interesante

  // // Folder for test artifacts such as screenshots, videos, traces, etc.
  // outputDir: 'test-results',

  // // path to the global setup files.
  // globalSetup: require.resolve('./global-setup'),

  // // path to the global teardown files.
  // globalTeardown: require.resolve('./global-teardown'),

  // timeout: 3000,

  // toHaveScreenshot: {
  //   // An acceptable amount of pixels that could be different, unset by default.
  //   maxDiffPixels: 10,
  // },

  // toMatchSnapshot: {
  //   // An acceptable ratio of pixels that are different to the
  //   // total amount of pixels, between 0 and 1.
  //   maxDiffPixelRatio: 0.1,
  // }

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'thefreerangetester_chrome',
      testIgnore: '/tests/tests-examples/*',
      testMatch: '/tests/thefreerangetester/without_pom/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'] ,
        baseURL: 'https://thefreerangetester.github.io/sandbox-automation-testing/',
      },
    },

    {
      name: 'thefreerangetester_chrome_android',
      testIgnore: '/tests/tests-examples/*',
      testMatch: '/tests/thefreerangetester/without_pom/*.spec.ts',
      use: {
        ...devices['Galaxy S5'],
        baseURL: 'https://thefreerangetester.github.io/sandbox-automation-testing/',
       },
    },

    {
      name: 'thefreerangetester_ios',
      testIgnore: '/tests/tests-examples/*',
      testMatch: '/tests/thefreerangetester/without_pom/*.spec.ts',
      use: {
        ...devices['iPad Pro 11'],
        baseURL: 'https://thefreerangetester.github.io/sandbox-automation-testing/',
       },
    },

    {
      name: 'thefreerangetester_chrome_with_pom',
      testMatch: '/tests/thefreerangetester/with_pom/thefreerangetester.spec.ts',
      use: {
        ...devices['Desktop Chrome'] ,
        baseURL: 'https://thefreerangetester.github.io/sandbox-automation-testing/',
       },
    },

    {
      name: 'tests_examples',
      testMatch: '/tests-examples/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
