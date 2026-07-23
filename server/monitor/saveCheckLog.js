import { supabase } from "../lib/supabase.js";


export async function saveCheckLog(product, result){


    const { error } = await supabase
    .from("product_check_logs")
    .insert({

        product_id: product.id,

        status: result.stock_status,

        price: result.price,

        error: result.error,

        checked_at: new Date()

    });



    if(error){

        console.log(
            "Check log error:",
            error.message
        );

    }


}