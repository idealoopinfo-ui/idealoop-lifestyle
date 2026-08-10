import { supabase } from "../lib/supabase.js";
import { getChecker } from "./checkers/index.js";
import { updateProductStatus } from "./updateProductStatus.js";
import { createNotification } from "./createNotification.js";
import { saveCheckLog } from "./saveCheckLog.js";


export async function monitorProducts(){

    console.log(
        "🔍 Checking products..."
    );


    const { data, error } = await supabase
        .from("products")
        .select(
            `
            id,
            title,
            short_description,
            description,
            marketplace,
            affiliate_url,
            source_url,
            shop_name,
            image_1,
            image_2,
            image_3,
            image_4,
            image_5,
            department,
            category,
            subcategory,
            gender
            `
        )
        .eq("monitor_enabled", true);



    if(error){

        console.error(
            "Supabase error:",
            error.message
        );

        return;

    }



    console.log(
        "Products found:",
        data.length
    );



    for(const product of data){


        console.log(
            "\nChecking:",
            product.title
        );
        const productImages = [
            product.image_1,
            product.image_2,
            product.image_3,
            product.image_4,
            product.image_5,
        ]
            .filter(Boolean)
            .flatMap((value) =>
                String(value)
                    .split(",")
                    .map((url) => url.trim())
                    .filter(Boolean)
            )
            .slice(0, 5);
        
        console.log(
            "📸 Product images:",
            productImages.length
        );



        if(
            product.marketplace?.toLowerCase()
            === "aliexpress"
        ){


            if(!product.source_url){

                const result = {
            
                    stock_status: "unknown",
            
                    price: null,
            
                    error: "Missing source URL"
            
                };
            
            
                await saveCheckLog(
                    product,
                    result
                );
            
            
                console.log(
                    "⚠ Missing source URL, skipping:",
                    product.title
                );
            
            
                continue;
            
            }


            const checker =
            getChecker(product.marketplace);



            const result =
            await checker(
                product.source_url
            );



            console.log(
                result
            );
            
            
            await saveCheckLog(
                product,
                result
            );


            // Product removed

            if(result.stock_status === "removed"){


                await updateProductStatus(
                    product.id,
                    false
                );


                await createNotification(

                    product,

                    "removed",

                    `${product.title} was removed from ${product.marketplace}`,

                    "critical"

                );


            }


        }


    }

}