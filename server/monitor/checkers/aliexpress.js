import axios from "axios";
import * as cheerio from "cheerio";


async function resolveUrl(url){

    const response = await axios.get(url,{

        maxRedirects:10,

        timeout:20000,

        headers:{
            "User-Agent":
            "Mozilla/5.0"
        }

    });


    return response.request.res.responseUrl || url;

}



export async function checkAliExpress(url){

    try {


        console.log(
            "Original URL:",
            url
        );


        const realUrl =
        await resolveUrl(url);



        console.log(
            "Resolved URL:",
            realUrl
        );



        const response =
        await axios.get(realUrl,{

            timeout:20000,

            headers:{
                "User-Agent":
                "Mozilla/5.0"
            },

            validateStatus:false

        });



        // Product page removed
        if(response.status === 404){

            return {

                stock_status:"removed",

                availability:"removed",

                price:null,

                error:"Product page not found"

            };

        }



        const $ =
        cheerio.load(response.data);



        const text =
        $("body")
        .text()
        .toLowerCase();



        // AliExpress removed product messages

        if(

            text.includes("sorry, this item is no longer available") ||

            text.includes("this product is no longer available") ||

            text.includes("page not found") ||

            text.includes("product does not exist")

        ){

            return {

                stock_status:"removed",

                availability:"removed",

                price:null,

                error:"Product removed"

            };

        }



        let stock="in_stock";



        if(

            text.includes("out of stock") ||

            text.includes("sold out") ||

            text.includes("temporarily unavailable")

        ){

            stock="out_of_stock";

        }



        return {

            stock_status:stock,

            availability:
            stock==="in_stock"
            ?"active"
            :"inactive",

            price:null,

            error:null

        };



    }

    catch(error){


        console.log(
            "AliExpress check failed:",
            error.message
        );


        return {

            stock_status:"unknown",

            availability:"unknown",

            price:null,

            error:error.message

        };

    }

}