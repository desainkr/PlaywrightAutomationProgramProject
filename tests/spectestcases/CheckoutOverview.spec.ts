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


test.describe("Swag labs checkout overview validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let checkoutOverview: CheckoutOverviewPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverview = new CheckoutOverviewPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveTitle("Swag Labs");
        await productPage.getSpecificProductDetails(productsToCart);
        await productPage.clickOncartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.clickonContinueBtn();
    })
    test('validate checkout overview page UI and URL', async ({ page }) => {

        await expect(page).toHaveURL(/checkout-step-two.html/);
        const elements = await checkoutOverview.getCheckoutOverviewElements();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.cancelBtn).toBeVisible();
        await expect(elements.finishBtn).toBeVisible();

    })

    test.skip('validate Cancel buuton functionality', async ({ page }) => {

        await checkoutOverview.clickonCancelBtn();
        await expect(page).toHaveURL(/inventory.html/);

    })

    test('validate item total calculation', async ({ page }) => {
        const overviewproducts = await checkoutOverview.getOverviewProducts();
        const calculatedtotal = overviewproducts.reduce((sum, { price }) => sum + parseFloat(price.replace("$", "")), 0);
        const UIItemTotal = await checkoutOverview.getItemTotal();
        expect(calculatedtotal).toBe(UIItemTotal);

    })
    test('validate final total(itemTotal+tax)', async ({ page }) => {
      
        const itemtotal =await checkoutOverview.getItemTotal();
        const tax= await checkoutOverview.gettax();
        const finalTotal = await checkoutOverview.getTotal();
        const expectedFinalTotal = itemtotal + tax;
        expect(finalTotal).toBe(expectedFinalTotal);

    })

})