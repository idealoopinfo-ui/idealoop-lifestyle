import { checkAliExpress } from "./aliexpress.js";
import { checkTemu } from "./temu.js";
import { checkAmazon } from "./amazon.js";


export function getChecker(marketplace) {

    switch (marketplace?.toLowerCase()) {

        case "aliexpress":
            return checkAliExpress;

        case "temu":
            return checkTemu;

        case "amazon":
            return checkAmazon;

        default:
            return null;

    }

}