import { CartPageLocators } from "../locators/CartPageLocators";
import { Page } from "@playwright/test";

export class CartPage {


    constructor(private page: Page) {}


        async clickOnContinueShopping()
        {
            await this.page.locator(CartPageLocators.shoppingCart).click();

        }

     async getCartPageElements()
     {
        return{      
          cartTitle: this.page.locator(CartPageLocators.cartTitle),
          shoppingCart: this.page.locator(CartPageLocators.shoppingCart),
          checkOut: this.page.locator(CartPageLocators.checkOut),

        };
     }

    async getCartProducts()

    {
         const allNames= await this.page.locator(CartPageLocators.productNames).allTextContents();
         const allDescription=await this.page.locator(CartPageLocators.productDescription).allTextContents();
         const allPrices= await this.page.locator(CartPageLocators.productPrices).allTextContents();
   
       //aaray of object [{name,description,price},{},{}]
   
     const allCartProducts= allNames.map((_, i)=> 
    ({
      name: allNames[i].trim(),
      description: allDescription[i].trim(),
      price: allPrices[i].trim()
    }))
    return allCartProducts;
     }

     async removeFirstProduct()
     {
      await this.page.locator(CartPageLocators.removeButton).first().click();

     }

async clickCheckoutButton()
{
await this.page.locator(CartPageLocators.checkOut).click();

}

    }




