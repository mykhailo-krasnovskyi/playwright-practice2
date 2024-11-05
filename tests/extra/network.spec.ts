

import { chromium } from "@playwright/test";
import { HomePage } from '../../page-objects/pages/HomePage';
import { SignInForm } from '../../page-objects/components/forms/SignInForm';
import { mainUserEmail, mainUserPassword, randomUserEmail } from '../../test-data/credentials';
import { GaragePage } from "../../page-objects/pages/GaragePage";
import { test } from '../../test-data/fixtures/fixtureBase'

test.describe(('Network test'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        const testData = {
            "status": "ok",
            "data": [
                {
                    "id": 197534,
                    "carBrandId": 2,
                    "carModelId": 8,
                    "initialMileage": 100,
                    "updatedMileageAt": "2024-10-17T16:30:33.000Z",
                    "carCreatedAt": "2024-10-17T16:30:33.000Z",
                    "mileage": 100,
                    "brand": "TEST NAME",
                    "model": "X5",
                    "logo": "bmw.png"
                },
            ]
        }

        await page.route('**/api/cars', route => route.fulfill({
            body: JSON.stringify(testData),
        }));
        //  await page.route('**/api/cars', route => route.abort());

        await homePage.open();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials(mainUserEmail, mainUserPassword);

    })
    test(('page.route test 1'), async ({ page }) => {


        await garagePage.verifyPageIsOpen();

    })
})