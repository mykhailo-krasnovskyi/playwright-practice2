import test from "@playwright/test";
import { HomePage } from '../page-objects/pages/HomePage';
import { SignInForm } from '../page-objects/components/forms/SignInForm';
import { mainUserEmail, mainUserPassword, randomUserEmail } from '../test-data/credentials';
import { GaragePage } from "../page-objects/pages/GaragePage";

test.describe(('GaragePage with POM'), () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.open();
        await homePage.openSignInForm();
        await signInForm.loginWithCredentials(mainUserEmail, mainUserPassword);
        await garagePage.verifyPageIsOpen();

    })

    test(('Add BMW X5'), async () => {
        await garagePage.addNewCar('BMW', 'X5', '100');
        await garagePage.verifyLastAddedCarName('BMW X5');
    })

    test(('Add Audi TT'), async () => {
        await garagePage.addNewCar('Audi', 'TT', '100');
        await garagePage.verifyLastAddedCarName('Audi TT');
    })

    test(('Add Fiat Ducato'), async () => {
        await garagePage.addNewCar('Fiat', 'Ducato', '100');
        await garagePage.verifyLastAddedCarName('Fiat Ducato');
    })

    test(('Add Ford Fiesta'), async () => {
        await garagePage.addNewCar('Ford', 'Fiesta', '100');
        await garagePage.verifyLastAddedCarName('Ford Fiesta');
    })

})