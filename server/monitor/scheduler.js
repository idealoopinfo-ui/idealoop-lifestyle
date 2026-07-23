import { monitorProducts } from "./monitorProducts.js";


export function startScheduler(){

    console.log(
        "⏰ Monitoring Scheduler Started"
    );


    // Test run

    monitorProducts();


    // Every 12 hours

    setInterval(()=>{

        monitorProducts();

    }, 12 * 60 * 60 * 1000);


}