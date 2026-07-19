const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// Test API
app.get("/", (req, res) => {

    res.json({
        message: "Idealoop API Running"
    });

});


// Start server
const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Idealoop API running on port ${PORT}`
    );

});