const express = require("express")
const bodyParser = require("body-parser")

const app = express()

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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


// Order Management Routes
require("./routes/orderManagementRoute")(app);



// set port, listen for requests
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://localhost:${PORT}`);    
});
