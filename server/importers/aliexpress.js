const { chromium } = require("playwright");

async function importAliExpress(url){

    let browser;

    try {

        browser = await chromium.launch({
            headless:true
        });

        const page = await browser.newPage({
            userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        });


        await page.goto(url,{
            waitUntil:"domcontentloaded",
            timeout:60000
        });


        const data = await page.evaluate(()=>{

            const title =
            document.title
            .replace(" | AliExpress","")
            .trim();


            const images =
            Array.from(document.images)
            .map(img=>img.src)
            .filter(src=>src.startsWith("http"))
            .slice(0,5);


            return {
                title,
                images
            };

        });


        await browser.close();


        return {

            title:
            data.title || "AliExpress Product",

            brand:
            "Unknown Brand",

            description:
            "Imported from AliExpress",

            shortDescription:
            "Imported automatically",

            marketplace:
            "AliExpress",

            affiliateUrl:
            url,

            targetMarket:
            "Global",

            images:
            data.images

        };


    } catch(error){

        if(browser){
            await browser.close();
        }

        console.log(
            "ALIEXPRESS IMPORT ERROR:",
            error.message
        );

        throw error;
    }

}


module.exports = importAliExpress;