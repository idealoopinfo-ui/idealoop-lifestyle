import { supabase } from "../lib/supabase.js";

export async function createNotification(
    product,
    type,
    message,
    severity = "warning"
) {

    const { error } = await supabase
        .from("product_notifications")
        .insert({

            product_id: product.id,

            notification_type: type,

            message: message,

            severity: severity,

            is_read: false

        });

    if (error) {

        console.log(
            "Notification Error:",
            error.message
        );

    }

}