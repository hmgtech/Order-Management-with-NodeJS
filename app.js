const express = require("express")
const bodyParser = require("body-parser")

const app = express()

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Order Management Application." });
});

const db = require("./models") //it will import models/index.js and will export db
db.sequelize.sync();

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// set port, listen for requests
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://localhost:${PORT}`);    
});
