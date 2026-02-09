import {Page} from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';

export class LoginPage

{
 constructor(private page:Page)
 {

 }
 async login(Username: string, password:string)
 {
     await this.page.fill(LoginLocators.usernameInput,Username);
     await this.page.fill(LoginLocators.passwordInput,password);
     await this.page.click(LoginLocators.loginButton);
 }

}