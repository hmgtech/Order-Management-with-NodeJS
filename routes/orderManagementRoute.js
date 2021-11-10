module.exports = (app, version) => {
    const OrderManagemetController = require("../controllers/orderManagementController");
  
    var router = require("express").Router();
   
    // Create a new Records
    // router.post("/address", OrderManagemetController.addAddress);
    router.route("/signup").post(OrderManagemetController.signup);
    router.route("/carton").post(OrderManagemetController.addCarton);
    router.route("/orderHeader").post(OrderManagemetController.addOrderHeader);
    router.route("/shipper").post(OrderManagemetController.addShipper);
    router.route("/product").post(OrderManagemetController.addProducts);
    router.route("/orderItem").post(OrderManagemetController.addOrderItems);
    router.route("/productClass").post(OrderManagemetController.addProductClass);

    //Retrive records
    router.route("/address").get(OrderManagemetController.getAllAddress).delete(OrderManagemetController.deleteAllAddress)
                            .post(OrderManagemetController.addAddress)
    router.route("/address/:id").get(OrderManagemetController.getAddress).put(OrderManagemetController.updateAddress)
                                .delete(OrderManagemetController.deleteAddress)
    router.route("/address/state/:ch").get(OrderManagemetController.getAddressByState)

    // Get Userdata
    router.route("/username").get(OrderManagemetController.getCustomer)

    //Update Records
    // router.put("/address/:id", OrderManagemetController.updateAddress)

    //Delete Records
    // router.delete("/address/:id", OrderManagemetController.deleteAddress)



    app.use(`/${version}/api/ordermanagement`, router);
  };
  