//export const BASE_URL= "https://www.saucedemo.com/";

const ENV_URL ={

    dev: "https://www.saucedemo.com/",
    qa: "https://www.saucedemo.com/",
    stage: "https://www.saucedemo.com/",
    prod: "https://www.saucedemo.com/",
};

const ENV= process.env.Env || "prod"
export const BASE_URL =(ENV_URL as any) [ENV]
export const USERNAME= "standard_user";
export const PASSWORD= "secret_sauce";

//run $env:ENV="qa"; npx playwright test ./tests/FinalPage.spec.ts --headed