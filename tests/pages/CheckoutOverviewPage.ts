import { Page } from "@playwright/test";
import { CheckoutOverviewLocators } from "../locators/CheckoutOverviewLocators";

export class CheckoutOverviewPage {

    constructor(private page: Page) { }

    async getCheckoutOverviewElements() {
        return {
            pageInfo: this.page.locator(CheckoutOverviewLocators.pageInfo),
            cancelBtn: this.page.locator(CheckoutOverviewLocators.cancelBtn),
            finishBtn: this.page.locator(CheckoutOverviewLocators.finishBtn),

        }
    }

    async getOverviewProducts() {
        const allNames = await this.page.locator(CheckoutOverviewLocators.productNames).allTextContents();
        const allDescription = await this.page.locator(CheckoutOverviewLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(CheckoutOverviewLocators.productPrices).allTextContents();

        //aaray of object [{name,description,price},{},{}]

        const allCartProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim()
        }))
        return allCartProducts;
    }

    async getItemTotal() {

        const text = await this.page.locator(CheckoutOverviewLocators.itemTotal).textContent();
        return parseFloat (text!.replace("Item total: $", "").trim());
    }

    async gettax() {
        const text = await this.page.locator(CheckoutOverviewLocators.tax).textContent();
        return parseFloat (text!.replace("Tax: $", "").trim());
    }


    async getTotal() {
        const text = await this.page.locator(CheckoutOverviewLocators.total).textContent();
        return parseFloat (text!.replace("Total: $", "").trim());
    }

    async clickonCancelBtn() {
        await this.page.locator(CheckoutOverviewLocators.cancelBtn).click()
    }

    async clickOnFinishBtn() {
        await this.page.locator(CheckoutOverviewLocators.finishBtn).click();

    }

}