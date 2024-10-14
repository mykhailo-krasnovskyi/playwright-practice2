import test from "@playwright/test";
import { HomePage } from '../../page-objects/pages/HomePage';
import { SignInForm } from '../../page-objects/components/forms/SignInForm';
import { mainUserEmail, mainUserPassword, mainUser2Email, mainUser2Password } from '../../test-data/credentials';
import { GaragePage } from "../../page-objects/pages/GaragePage";

test.describe(('Setup'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
    })

    test(('Login to mainUser and Save the state'), async ({ page }) => {
        await homePage.open();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials(mainUserEmail, mainUserPassword);
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({ path: 'test-data/states/mainUserState.json' });
    })

    test(('Login to mainUser2 and Save the state'), async ({ page }) => {
        await homePage.open();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials(mainUser2Email, mainUser2Password);
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({ path: 'test-data/states/mainUser2State.json' });
    })

})