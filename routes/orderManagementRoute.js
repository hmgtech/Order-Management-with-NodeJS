module.exports = app => {
    const OrderManagemetController = require("../controllers/orderManagementController");
  
    var router = require("express").Router();
   
    // Create a new Records
    router.post("/addAddress", OrderManagemetController.addAddress);
    router.post("/addOnlineCustomer", OrderManagemetController.addOnlineCustomer);
    router.post("/addCarton", OrderManagemetController.addCarton);
    router.post("/addOrderHeader", OrderManagemetController.addOrderHeader);
    router.post("/addShipper", OrderManagemetController.addShipper);
    router.post("/addProducts", OrderManagemetController.addProducts);
    router.post("/addOrderItems", OrderManagemetController.addOrderItems);


    app.use("/api/ordermanagement", router);
  };
  