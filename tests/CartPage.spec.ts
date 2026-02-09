import { test, expect } from "@playwright/test";
import { ProductPageLocators } from "./locators/ProductPageLocators";
import { ProductPage } from "./pages/ProductPage";
import { BASE_URL, PASSWORD, USERNAME } from "./utils/envConfig";
import { LoginPage } from "./pages/LoginPage";
import { LoginLocators } from "./locators/LoginLocators";
import { CartPage } from "./pages/CartPage";
import { productsToCart } from "../test-data/products";

test.describe("Prodct page validation", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveTitle("Swag Labs");
    })

    test('validate cart page URL and UI elements ', async ({ page }) => {
        await productPage.addAllProductsToCart();
        await productPage.clickOncartLink();
        // Validate URL
        await expect(page).toHaveURL(/cart.html/);
        //Validate UI elements
        const ui = await cartPage.getCartPageElements();

        await expect((ui).cartTitle).toBeVisible();
        await expect((ui).shoppingCart).toBeVisible();
        await expect((ui).checkOut).toBeVisible();


    })

    test('validate continue shopping functionality ', async ({ page }) => {

        await productPage.addAllProductsToCart();
        await productPage.clickOncartLink();
        await cartPage.clickOnContinueShopping();
        await expect(page).toHaveURL(/inventory.html/);

    })

    test('validate first product in the cart page ', async ({ page }) => {
        const firstProduct = await productPage.getFirstProductDetails();
        await productPage.addFirstProductToCart();
        await productPage.clickOncartLink();

        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts[0]).toEqual(firstProduct);


    })
    test('validate all products added to the cart page ', async ({ page }) => {

        const allProductDetails = await productPage.getAllProductDetails();
        await productPage.addAllProductsToCart();
        await productPage.clickOncartLink();
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(allProductDetails)

    })

    test('validate speccific product added to the cart page ', async ({ page }) => {

        const getSpecificProductDetails = await productPage.getSpecificProductDetails(productsToCart);
        await productPage.addSpecificProductsToCart(productsToCart);
        await productPage.clickOncartLink();
        const cartProducts = await cartPage.getCartProducts();
        expect(cartProducts).toEqual(getSpecificProductDetails);

    })

    test('validate remove product funcationality ', async ({ page }) => {
        await productPage.addAllProductsToCart();
        await productPage.clickOncartLink();
        const initialProducts = await cartPage.getCartProducts();
        expect(initialProducts.length).toBeGreaterThan(0);
        await cartPage.removeFirstProduct();

        const updateCartProducts = await cartPage.getCartProducts();
        expect(updateCartProducts.length).toBe(initialProducts.length - 1);



    })

})