const axios = require("axios");
const cheerio = require("cheerio");


async function importAliExpress(url){

    try {

        const response = await axios.get(url, {

            timeout:20000,

            headers:{

                "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"

            }

        });


        const html = response.data;

        const $ = cheerio.load(html);


        let title =
            $("title").text()
            .replace(" | AliExpress","")
            .trim();


        let images=[];


        $("img").each((i,el)=>{

            const src=$(el).attr("src");

            if(src && src.startsWith("http")){

                images.push(src);

            }

        });


        images=[...new Set(images)].slice(0,5);



        return {


            title:
            title || "AliExpress Product",


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


            images


        };


    }

    catch(error){

        console.log(
            "ALIEXPRESS IMPORT ERROR:",
            error.message
        );


        throw error;

    }


}


module.exports=importAliExpress;