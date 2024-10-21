import { test, expect, Locator } from '@playwright/test';

test.describe('Locators', () => {
  test('getByRole', async ({ page }) => {
    await page.goto('');

    await expect(page.getByRole('heading', { level: 1, name: 'Do more!' })).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('//h1')).toBeVisible();
  })

  test('getByText', async ({ page }) => {
    await page.goto('');

    await expect(page.getByText('Do more!', { exact: true })).toBeVisible();
  })

  test('getByLabel', async ({ page }) => {
    await page.goto('');

    await page.getByText('Sign In').click();
    await expect(page.getByLabel('Email')).toBeVisible();
  })

  test('hasText', async ({ page }) => {
    await page.goto('');

    await page.locator('//button', { hasText: 'Sign' }).click();
  })

  test('has', async ({ page }) => {
    await page.goto('');

    const button = '';
    const fbIcon = page.locator('.icon-facebook');

    await expect(page.locator('//a', { hasNot: fbIcon }))
  })

  test('multiple elements', async ({ page }) => {
    await page.goto('');

    console.log('Number of elements' + await page.locator('.socials_icon').count());
  })

  test('Inputs', async ({ page }) => {
    await page.goto('');
    await page.getByText('Sign In').click();
    await page.locator('#signinEmail').fill('test@examle.com');
    await page.locator('#signinEmail').fill('test@examle.com');
    await page.locator('#signinPassword').pressSequentially('1234567910', { delay: 400 });

  })

  test('Dropdowns', async ({ page }) => {
    await page.goto('');
    await page.getByText('Sign In').click();
    await page.locator('#signinEmail').fill('michael.krasnovskyi+testUser1@gmail.com');
    await page.locator('#signinPassword').pressSequentially('ZSgeVQhuU3qkvlG', { delay: 100 });
    await page.locator('//*[@class="modal-content"]//button[@class="btn btn-primary"]').click();
    await page.locator('//button[@class="btn btn-primary"]').click();
    await page.locator('#addCarBrand').selectOption('Ford');

  })

  test('focus/blur', async ({ page }) => {
    await page.goto('');
    await page.getByText('Sign In').click();
    await page.locator('#signinEmail').focus();
    await page.waitForTimeout(1000);
    await page.locator('#signinEmail').blur();

    // await page.locator('#signinPassword').pressSequentially('ZSgeVQhuU3qkvlG', { delay: 100 });
    // await page.locator('//*[@class="modal-content"]//button[@class="btn btn-primary"]').click();
    // await page.locator('//button[@class="btn btn-primary"]').click();
    // await page.locator('#addCarBrand').selectOption('Ford');

  })

  test('scroll', async ({ page }) => {
    await page.goto('');

    const fbIcon: Locator = page.locator('.icon-facebook');

    await fbIcon.scrollIntoViewIfNeeded();

  })

  test('text', async ({ page }) => {
    await page.goto('');
    const buttonText = await page.locator('.header_signin').innerText();
    const buttonsText = await page.locator('button').allInnerTexts();

    console.log(buttonsText)
  })

  test('assertions', async ({ page }) => {
    await page.goto('');
    let number = 10;
    expect(number).toBe(11);
    await expect(page.locator('h1')).not.toBeVisible();
  })

  test('screenshot', async ({ page, browser }) => {
    await page.goto('');
    await expect(page.locator('//footer')).toHaveScreenshot('header-screen.png');
  })



})
