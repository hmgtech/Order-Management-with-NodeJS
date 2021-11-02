const version = "v1"

const express = require("express")
const bodyParser = require("body-parser")
const { verifyToken } = require("./middlewares/verifyToken")
const OrderManagemetController = require("./controllers/orderManagementController")

const app = express()

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Order Management Application." });
});

//Add Verify Token Middleware
app.use('/v1', verifyToken)

// login route
app.post("/login", OrderManagemetController.jwtLogin)

const db = require("./models") //it will import models/index.js and will export db
db.sequelize.sync();

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });


// Order Management Routes
require("./routes/orderManagementRoute")(app, version);



// set port, listen for requests
const PORT = 8002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`http://localhost:${PORT}`);    
});
