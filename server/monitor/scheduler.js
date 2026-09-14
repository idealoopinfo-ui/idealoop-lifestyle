import { monitorProducts } from "./monitorProducts.js";
import { checkSixMonthReviews } from "./sixMonthReview.js";


export function startScheduler(){

    console.log(
        "⏰ Monitoring Scheduler Started"
    );


    // Test run

    monitorProducts()
        .then(() => {

            console.log(
                "✅ Product monitoring completed"
            );

            return checkSixMonthReviews();

        })
        .catch((error) => {

            console.error(
                "❌ Monitoring error:",
                error
            );

        });


    // Every 12 hours

    setInterval(() => {

        monitorProducts()
            .then(() => {

                console.log(
                    "✅ Product monitoring completed"
                );

                return checkSixMonthReviews();

            })
            .catch((error) => {

                console.error(
                    "❌ Monitoring error:",
                    error
                );

            });

    }, 12 * 60 * 60 * 1000);

}