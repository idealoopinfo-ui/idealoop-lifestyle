import { supabase } from "../lib/supabase.js";
import { createNotification } from "./createNotification.js";

export async function checkSixMonthReviews() {
    console.log("📅 Checking six-month product reviews...");

    const now = new Date();

    const { data, error } = await supabase
        .from("products")
        .select(`
            id,
            title,
            marketplace,
            status,
            monitor_enabled,
            created_at,
            last_reviewed_at,
            next_review_at
        `)
        .neq("status", "removed");

    if (error) {
        console.error(
            "Six-month review query error:",
            error.message
        );

        return;
    }

    console.log(
        "Products checked for six-month review:",
        data.length
    );

    for (const product of data) {

        let nextReviewDate;

        /*
         * Existing products:
         * If next_review_at has not been set yet,
         * calculate the first review from created_at.
         */
        if (product.next_review_at) {

            nextReviewDate = new Date(
                product.next_review_at
            );

        } else {

            nextReviewDate = new Date(
                product.created_at
            );

            nextReviewDate.setMonth(
                nextReviewDate.getMonth() + 6
            );

        }

        /*
         * Product is not due yet.
         */
        if (nextReviewDate > now) {
            continue;
        }

        console.log(
            "🔔 Six-month review due:",
            product.title
        );

        /*
         * Create the notification.
         */
        await createNotification(
            product,
            "review_due",
            `${product.title} is due for its 6-month product review.`,
            "warning"
        );

        /*
         * Move the next review date forward by 6 months.
         *
         * This prevents the scheduler from creating
         * the same notification every 12 hours.
         */
        const nextReview = new Date(now);

        nextReview.setMonth(
            nextReview.getMonth() + 6
        );

        const { error: updateError } = await supabase
            .from("products")
            .update({
                last_reviewed_at: now.toISOString(),
                next_review_at: nextReview.toISOString()
            })
            .eq("id", product.id);

        if (updateError) {

            console.error(
                "Review date update error:",
                updateError.message
            );

        }
    }
}