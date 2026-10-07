import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({
    path: new URL("../../.env", import.meta.url),
});

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
console.log(
    "Service key loaded:",
    Boolean(supabaseKey),
    "Length:",
    supabaseKey?.length
);

if (!supabaseUrl) {
    throw new Error("VITE_SUPABASE_URL is missing.");
}

if (!supabaseKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing.");
}

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);