import { Page } from "@playwright/test";
import { CheckoutPageLocators } from "../locators/CheckoutPageLocators"


export class CheckoutPage {

    constructor(private page: Page) { };


    async getCheckoutElements() {

        return {
            pageInfo: this.page.locator(CheckoutPageLocators.pageInfo),
            cancelButton: this.page.locator(CheckoutPageLocators.cancelButton),
            continueButton: this.page.locator(CheckoutPageLocators.continueButton),

        }
    }
    async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(CheckoutPageLocators.firstname, firstName)
        await this.page.fill(CheckoutPageLocators.lastName, lastName)
        await this.page.fill(CheckoutPageLocators.postalCode, postalCode)

    }

    async clickonCancelBtn() {
        await this.page.click(CheckoutPageLocators.cancelButton);

    }


    async clickonContinueBtn() {
        await this.page.click(CheckoutPageLocators.continueButton);

    }

    async getErrorMessage()
    {
      return  await this.page.locator(CheckoutPageLocators.errorMsg).textContent();
    }

}