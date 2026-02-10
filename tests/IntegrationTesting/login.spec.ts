import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
test('Login to saucedemo application with valid cdentials', async ({ page }) => {
    const loginpage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginpage.login(USERNAME, PASSWORD);
    await expect(page.getByText('Swag Labs', { exact: true })).toBeVisible();
    //await expect(page).toHaveURL(/inventory/);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveTitle("Swag Labs");


})