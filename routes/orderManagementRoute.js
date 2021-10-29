module.exports = app => {
    const OrderManagemetController = require("../controllers/orderManagementController");
  
    var router = require("express").Router();
   
    // Create a new Records
    // router.post("/address", OrderManagemetController.addAddress);
    router.post("/onlineCustomer", OrderManagemetController.addOnlineCustomer);
    router.post("/carton", OrderManagemetController.addCarton);
    router.post("/orderHeader", OrderManagemetController.addOrderHeader);
    router.post("/shipper", OrderManagemetController.addShipper);
    router.post("/product", OrderManagemetController.addProducts);
    router.post("/orderItem", OrderManagemetController.addOrderItems);
    router.post("/productClass", OrderManagemetController.addProductClass);

    //Retrive records
    router.route("/address").get(OrderManagemetController.getAllAddress).delete(OrderManagemetController.deleteAllAddress)
                            .post(OrderManagemetController.addAddress)
    router.route("/address/:id").get(OrderManagemetController.getAddress).put(OrderManagemetController.updateAddress)
                                .delete(OrderManagemetController.deleteAddress)
    router.route("/address/state/:ch").get(OrderManagemetController.getAddressByState)

    //Update Records
    // router.put("/address/:id", OrderManagemetController.updateAddress)

    //Delete Records
    // router.delete("/address/:id", OrderManagemetController.deleteAddress)



    app.use("/api/ordermanagement", router);
  };
  