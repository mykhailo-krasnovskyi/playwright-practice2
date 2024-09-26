import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/pages/HomePage';
import { SignInForm } from '../page-objects/components/forms/SignInForm';
import { GaragePage } from '../page-objects/pages/GaragePage';
import { mainUserEmail, mainUserPassword, randomUserEmail } from '../test-data/credentials';

test.describe(('Sign In form with CodeGen'), () => {
  let homePage: HomePage;
  let signInForm: SignInForm;
  let garagePage: GaragePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);

    await homePage.open();
  })

  test('Invalid email', async () => {
    await homePage.openSignInForm();
    await signInForm.enterValueAndTriggerErrorOnEmailField('asfasfafs');
    await signInForm.verifyErrorMessageByText('Email is incorrect');
  });

  test('Incorrect email', async () => {
    await homePage.openSignInForm();
    await signInForm.loginWithCredentials(randomUserEmail, '4234324234');
    await signInForm.verifyErrorMessageByText('Wrong email or password');
  });

  test('Password - empty field', async () => {
    await homePage.openSignInForm();
    await signInForm.enterValueAndTriggerErrorOnPasswordField('');
    await signInForm.verifyErrorMessageByText('Password required');

  });

  test('Correct login', async () => {
    await homePage.openSignInForm();
    await signInForm.loginWithCredentials(mainUserEmail, mainUserPassword);
    await garagePage.verifyPageIsOpen();
  });
})
