import { test, expect } from "@playwright/test";
import { ProductPage } from "../pages/ProductPage";
import { BASE_URL, PASSWORD, USERNAME } from "../utils/envConfig";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { CartPage } from "../pages/CartPage";
import { checkoutData } from "../../test-data/checkoutData";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CartPageLocators } from "../locators/CartPageLocators";
//import { CheckoutPageLocators } from "./locators/CheckoutPageLocators";
import { Page } from "@playwright/test";


test.describe("Swag labs checkout page validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveTitle("Swag Labs");
        await productPage.addFirstProductToCart();
        await productPage.clickOncartLink();
    })

    test('validte checkout page UI elements', async ({ page }) => {
        await cartPage.clickCheckoutButton();
        await expect(page).toHaveURL(/checkout-step-one.html/);
        const elements = await checkoutPage.getCheckoutElements();
        await expect(elements.cancelButton).toBeVisible();
        await expect(elements.continueButton).toBeVisible();
        await expect(elements.pageInfo).toBeVisible();

    })

    test('validte cancel button functionality', async ({ page }) => {
        await cartPage.clickCheckoutButton();
        await checkoutPage.clickonCancelBtn();
        // await expect(page).toHaveURL("https://www.saucedemo.com/");
        await expect(page).toHaveURL(/cart.html/);
    })

    test('validte continue button functionality', async ({ page }) => {
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode)
        await checkoutPage.clickonContinueBtn();
        await expect(page).toHaveURL(/checkout-step-two.html/);
    })

    test.only('validate error message when continue without entering data', async ({ page }) => {
        await cartPage.clickCheckoutButton();
        await checkoutPage.clickonContinueBtn();
        const error = await checkoutPage.getErrorMessage();
        expect(error?.trim()).toBe("Error: First Name is required");


    })

})