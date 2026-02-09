import { Page } from '@playwright/test';
import { ProductPageLocators } from '../locators/ProductPageLocators';

export class ProductPage {
    constructor(private page: Page) { }

    async logout() {
        await this.page.click(ProductPageLocators.SettingIcon);
        await this.page.click(ProductPageLocators.LogoutLink);
    }

    async openAboutPage() {
        await this.page.click(ProductPageLocators.SettingIcon);
        await this.page.click(ProductPageLocators.aboutLink);
    }

    async validateAllProductsDisplayed() {
        const names = await this.page.locator(ProductPageLocators.productNames).allTextContents();
        const descrptions = await this.page.locator(ProductPageLocators.productDescription).allTextContents();
        const price = await this.page.locator(ProductPageLocators.productPrices).allTextContents();
        const buttoncount = await this.page.locator(ProductPageLocators.addToCartBtns).count();
        console.log('Names:', names.length);
        console.log('Descriptions:', descrptions.length);
        console.log('Prices:', price.length);
        console.log('Buttons:', buttoncount);
        if (names.length === 0)
            throw new Error("No products found")

        if (names.length !== descrptions.length || names.length !== price.length || names.length !== buttoncount)
            throw new Error("Mismatch between the product details");
    }

    async addFirstProductToCart() {
        await this.page.locator(ProductPageLocators.addToCartBtns).first().click();
    }


    async addAllProductsToCart() {

        const buttons = this.page.locator(ProductPageLocators.addToCartBtns)
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
            await buttons.nth(i).click();
            await this.page.waitForTimeout(1000);
        }

    }

   async addSpecificProductsToCart(productName : string[])
   {
   const addProducts = this.page.locator(ProductPageLocators.productNames);
   const  count = await addProducts.count();
   for(let i=0; i<count ; i++)
   {
       const name=await addProducts.nth(i).textContent();

       if(name && productName.includes(name.trim()))
       {
         await this.page.locator(ProductPageLocators.addToCartBtns).nth(i).click();
         await this.page.waitForTimeout(1000);


       }
   }
   }

    async filterByNameAtoZ() {
        await this.page.selectOption(ProductPageLocators.filterDropDown, 'az');
    }

    async filterByNameZtoA() {
        await this.page.selectOption(ProductPageLocators.filterDropDown, 'za');
    }

    async filterPriceLowtoHigh() {
        await this.page.selectOption(ProductPageLocators.filterDropDown, 'lohi');
    }
    async filterPriceHightoLow() {
        await this.page.selectOption(ProductPageLocators.filterDropDown, 'hilo');

    }

    async getProductNames() {
        return await this.page.locator(ProductPageLocators.productNames).allTextContents();
    }

    async getProductPrices() {
        const prices = await this.page.locator(ProductPageLocators.productPrices).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')));

    }

    async clickOncartLink() {
        await this.page.locator(ProductPageLocators.cartlink).click();

    }

      async getFirstProductDetails()
      {
      const name= await this.page.locator(ProductPageLocators.productNames).first().textContent();
      const description=await this.page.locator(ProductPageLocators.productDescription).first().textContent();
      const price= await this.page.locator(ProductPageLocators.productPrices).first().textContent();
      
      return {
        name :name?.trim(),
        description: description?.trim(),
        price: price?.trim(),

      }

      }
  async getAllProductDetails()
  {
      const allNames= await this.page.locator(ProductPageLocators.productNames).allTextContents();
      const allDescription=await this.page.locator(ProductPageLocators.productDescription).allTextContents();
      const allPrice= await this.page.locator(ProductPageLocators.productPrices).allTextContents();

    //aaray of object [{name,description,price},{},{}]

  const allProducts= allNames.map((_,i)=>
 ({
   name: allNames[i].trim(),
   description: allDescription[i].trim(),
   price: allPrice[i].trim()
 }))
 return allProducts;
  }
async getSpecificProductDetails(productName :string[])
{
 const allNames= await this.page.locator(ProductPageLocators.productNames).allTextContents();
      const allDescription=await this.page.locator(ProductPageLocators.productDescription).allTextContents();
      const allPrice= await this.page.locator(ProductPageLocators.productPrices).allTextContents();

    //aaray of object [{name,description,price},{},{}]

  const allProducts= allNames.map((_,i)=>
 ({
   name: allNames[i].trim(),
   description: allDescription[i].trim(),
   price: allPrice[i].trim()
 }))
 return allProducts.filter(p =>productName.includes(p.name));
  }



}