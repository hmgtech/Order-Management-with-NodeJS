module.exports = app => {
    const OrderManagemetController = require("../controllers/orderManagementController");
  
    var router = require("express").Router();
   
    // Create a new Records
    router.post("/address", OrderManagemetController.addAddress);
    router.post("/onlineCustomer", OrderManagemetController.addOnlineCustomer);
    router.post("/carton", OrderManagemetController.addCarton);
    router.post("/orderHeader", OrderManagemetController.addOrderHeader);
    router.post("/shipper", OrderManagemetController.addShipper);
    router.post("/product", OrderManagemetController.addProducts);
    router.post("/orderItem", OrderManagemetController.addOrderItems);
    router.post("/productClass", OrderManagemetController.addProductClass);
    


    app.use("/api/ordermanagement", router);
  };
  