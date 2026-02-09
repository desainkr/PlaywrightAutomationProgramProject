import { FinalPageLocators } from "../locators/FinalPageLocators";
import { Page } from "@playwright/test";

export class FinalPage {

    constructor(private page: Page) { }


    async getFinalPageElemnts() {
        return {
            pageInfo: this.page.locator(FinalPageLocators.pageInfo),
            successMsg: this.page.locator(FinalPageLocators.successMsg),
            backHomeBtn: this.page.locator(FinalPageLocators.backHomeBtn),

        }
    }
 async getSuccessMsgText()
 {
  const text =await this.page.locator(FinalPageLocators.successMsg).innerText()
  return text;

 }

async clickOnBackHomeBtn()
{

 await this.page.locator(FinalPageLocators.backHomeBtn).click()   
}

}