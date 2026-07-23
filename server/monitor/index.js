import { startScheduler } from "./scheduler.js";


export function startMonitoring(){

    console.log(
        "🟢 Product Monitoring System Started"
    );

    startScheduler();

}