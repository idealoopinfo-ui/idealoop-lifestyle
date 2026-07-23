import { checkAliExpress }
from "./aliexpress.js";


export function getChecker(marketplace){


    switch(marketplace){


        case "Aliexpress":

            return checkAliExpress;


        default:

            return null;

    }

}