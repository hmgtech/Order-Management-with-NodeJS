module.exports = app => {
    const OrderManagemetController = require("../controllers/orderManagementController");
  
    var router = require("express").Router();
   
    // Create a new Records
    router.post("/addAddress", OrderManagemetController.addAddress);
    router.post("/addOnlineCustomer", OrderManagemetController.addOnlineCustomer);
    
  
    app.use("/api/ordermanagement", router);
  };
  