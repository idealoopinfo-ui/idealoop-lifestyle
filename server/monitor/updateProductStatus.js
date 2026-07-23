import { supabase } from "../lib/supabase.js";


export async function updateProductStatus(
    productId,
    isActive
) {


    const { error } = await supabase
        .from("products")
        .update({

            is_active: isActive

        })
        .eq("id", productId);



    if(error){

        console.log(
            "Update product status error:",
            error.message
        );

    }


}