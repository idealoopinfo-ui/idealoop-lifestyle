import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { startMonitoring } from "./monitor/index.js";
import { monitorProducts } from "./monitor/monitorProducts.js";


dotenv.config({
    path:"./.env"
});


const app = express();


app.use(
    cors({
        origin:[
            "http://localhost:5173",
            "https://idealoop-lifestyle.netlify.app"
        ]
    })
);
app.use(express.json());


app.get("/", (req,res)=>{

    res.send(
        "Idealoop Backend Running"
    );

});

app.post("/api/monitor/run", async (req,res)=>{

    try{

        await monitorProducts();


        res.json({

            success:true,

            message:"Product monitoring completed"

        });


    }
    catch(error){


        console.error(error);


        res.status(500).json({

            success:false,

            error:error.message

        });


    }

});


const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

    startMonitoring();

});