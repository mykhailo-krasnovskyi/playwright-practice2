import { chromium, expect } from "@playwright/test";
import { HomePage } from '../page-objects/pages/HomePage';
import { SignInForm } from '../page-objects/components/forms/SignInForm';
import { mainUserEmail, mainUserPassword, randomUserEmail } from '../test-data/credentials';
import { GaragePage } from "../page-objects/pages/GaragePage";
import { test } from '../test-data/fixtures/pageSizeBase'

test.describe(('Fixtures'), () => {

    test.beforeEach(async ({ page }) => {

    })

    test.skip(('Open a page Without fixtures'), async () => {
        //create browser
        const browser = await chromium.launch();

        //create context
        const context = await browser.newContext();

        //create page

        const page = await context.newPage();

        await page.goto('https://wikipedia.org');
    })

    test(('Open a page With fixtures 1 '), async ({ pageSmall }) => {
        //    await page.goto('https://wikipedia.org');
        await pageSmall.goto('https://wikipedia.org');
    })

    test(('Open a page With fixtures 2 '), async ({ page, pageMedium }) => {
        await page.goto('https://wikipedia.org');
    })

    test(('Open a page With fixtures 3 '), async ({ page, pageBig }) => {
        await page.goto('https://wikipedia.org');
    })


})
