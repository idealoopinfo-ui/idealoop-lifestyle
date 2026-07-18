const importAliExpress=require("./aliexpress");

async function importProduct(url,marketplace){

    switch(marketplace){

        case "AliExpress":
            return await importAliExpress(url);

        default:
            throw new Error("Marketplace not supported");

    }

}

module.exports=importProduct;