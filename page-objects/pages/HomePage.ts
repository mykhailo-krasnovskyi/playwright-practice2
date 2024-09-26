import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('.header_signin');
    }

    async open() {
        await this.page.goto('');
    }

    async openSignInForm() {
        await this.signInButton.click();
    }
}