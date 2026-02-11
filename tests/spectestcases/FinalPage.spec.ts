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
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { productsToCart } from "../../test-data/products";
import { FinalPage } from "../pages/FinalPage";

test.describe("Swag labs final page validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverview: CheckoutOverviewPage;
    let finalPage: FinalPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverview = new CheckoutOverviewPage(page);
        finalPage = new FinalPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveTitle("Swag Labs");
        await productPage.getSpecificProductDetails(productsToCart);
        await productPage.clickOncartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickonContinueBtn();
        await checkoutOverview.clickOnFinishBtn();
    })
    test('validate checkout overview page UI and url', async ({ page }) => {

        await expect(page).toHaveURL(/checkout-complete.html/);
        const elements = await finalPage.getFinalPageElemnts();
        await expect(elements.backHomeBtn).toBeVisible();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.successMsg).toBeVisible();

    })
    test('validate success message', async ({ page }) => {

        const msg = await finalPage.getSuccessMsgText();
        expect(msg).toBe("Thank you for your order!");

    })
    test('validate Backhome Button', async ({ page }) => {

        await finalPage.clickOnBackHomeBtn();
        expect(page).toHaveURL(/inventory.html/);
    })


})