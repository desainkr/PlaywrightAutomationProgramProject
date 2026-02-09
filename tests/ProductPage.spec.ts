import { test, expect } from "@playwright/test";
import { ProductPageLocators } from "./locators/ProductPageLocators";
import { ProductPage } from "./pages/ProductPage";
import { BASE_URL, PASSWORD, USERNAME } from "./utils/envConfig";
import { LoginPage } from "./pages/LoginPage";
import { LoginLocators } from "./locators/LoginLocators";


test.describe("Prodct page validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveTitle("Swag Labs");
    })

    test('Validate logout on Prod page', async ({ page }) => {
        await productPage.logout();
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible();

    })

    test('Validate About page and navigate back', async ({ page }) => {
        await productPage.openAboutPage();
        await expect(page.locator(ProductPageLocators.requestDemoBtn)).toBeVisible();
        await expect(page.locator(ProductPageLocators.tryItFreeBtn)).toBeVisible();
        await page.goBack();
        await expect(page.locator(ProductPageLocators.SettingIcon)).toBeVisible();

    })
    test('Validate product page details', async ({ page }) => {

        await productPage.validateAllProductsDisplayed();
        await productPage.addFirstProductToCart();
        await productPage.addAllProductsToCart();

    })

    test("Validate adding specific products to cart", async ({ page }) => {
        //await productPage.
    })

    test('Filter by name A to Z', async ({ page }) => {

        await productPage.filterByNameAtoZ();
        const names = await productPage.getProductNames();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);

    })

    test('Filter by name Z to A', async ({ page }) => {

        await productPage.filterByNameZtoA();
        const names = await productPage.getProductNames();
        const sorted = [...names].sort().reverse();
        await page.waitForTimeout(3000);
        expect(names).toEqual(sorted);
    })

    test('Filter by price Low to High', async ({ page }) => {

        await productPage.filterPriceLowtoHigh();
        const prices = await productPage.getProductPrices();
        const sortedPrice = [...prices].sort((a,b) => a-b);
        expect(prices).toEqual(sortedPrice);

    })
    test('Filter by price High to Low', async ({ page }) => {

        await productPage.filterPriceHightoLow();
        const prices = await productPage.getProductPrices();
        const sortedPrice = [...prices].sort((a,b) => b-a);
        expect(prices).toEqual(sortedPrice);

    })

})