const express = require("express")
const bodyParser = require("body-parser")

const app = express()

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Order Management Application." });
});


// set port, listen for requests
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://localhost:${PORT}`);
    
});
