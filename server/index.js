const express = require("express");
const cors = require("cors");

const detectMarketplace = require("./utils/detectMarketplace");
const importProduct = require("./importers");

const app = express();

app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {

    res.json({
        message: "Idealoop Product Import API Running"
    });

});


// Product Import API
app.post("/api/import-product", async (req, res) => {
    console.log("Request received:", req.body);

    try {

        const { url } = req.body;

        if (!url) {

            return res.status(400).json({
                error: "Product URL required"
            });

        }


        const marketplace = detectMarketplace(url);


        const product = await importProduct(
            url,
            marketplace
        );


        res.json({

            success: true,

            product

        });


    } catch (error) {

        console.log("IMPORT ERROR:", error.message);


        res.status(500).json({

            error: error.message

        });

    }

});


// Start server
const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Idealoop Import API running on port ${PORT}`
    );

});