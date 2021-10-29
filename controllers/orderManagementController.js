const db = require("../models");
const Op = db.Sequelize.Op;

// Intializing Tables
const AddressTableReference = db.address
const OnlineCustomerTableReference = db.online_customer
const CartonTableReference = db.carton
const OrderHeaderTabeReference = db.order_header
const ShipperTabeReference = db.shipper
const OrderItemTableReference = db.order_item
const ProductTableReference = db.product
const ProductClassTableReference = db.product_class


exports.addAddress = (req, res) => {
    // Validate request
    if (!req.body.address_line_1 || !req.body.pincode) {
      res.status(400).send({
        message: "ADDRESS LINE-1 Or PINCODE can not be empty!"
      });
      return;
    }
  
    // Create a Address Record
    const addressContent = {
        address_line_1: req.body.address_line_1,
        address_line_2: req.body.address_line_2 ? req.body.address_line_2 : '',
        city: req.body.city ? req.body.city : '',
        state: req.body.state ? req.body.state : '',
        pincode: req.body.pincode,
        country: req.body.country ? req.body.country : ''
    };
  
    // Save Record in the database
    AddressTableReference.create(addressContent)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
};
  
exports.addOnlineCustomer = (req, res) => {
    // Validate request
    if (!req.body.customer_fname || !req.body.email || 
        !req.body.address_id || !req.body.username || 
        !req.body.gender) {
      res.status(400).send({
        message: "Customer First Name can not be empty!"
      });
      return;
    }
  
    // Create a Record
    const onlineCustomerContent = {
        customer_fname: req.body.customer_fname,
        customer_lname: req.body.customer_lname ? req.body.customer_lname : '',
        customer_email: req.body.email,
        customer_phone: req.body.phone ? req.body.phone : '',
        customer_address_id: req.body.address_id,
        customer_username: req.body.username,
        customer_gender: req.body.gender,
    };
  
    // Save Record in the database
    OnlineCustomerTableReference.create(onlineCustomerContent)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
};

exports.addCarton = (req, res) => {
    // Validate request
    if (!req.body.len || !req.body.width || 
        !req.body.height) {
      res.status(400).send({
        message: "Customer First Name can not be empty!"
      });
      return;
    }
  
    // Create a Record
    const cartonContent = {
        len: req.body.len,
        width: req.body.width,
        height: req.body.height,
    };
  
    // Save Record in the database
    CartonTableReference.create(cartonContent)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
};

exports.addOrderHeader = (req, res) => {
    // Validate request
    if (!req.body.customer_id || !req.body.order_date || !req.body.shipper_id ||
        !req.body.payment_mode) {
      res.status(400).send({
        message: "Customer First Name can not be empty!"
      });
      return;
    }
  
    // Create a Record
    const orderHeaderContent = {
        customer_id: req.body.customer_id,
        order_date: req.body.order_date,
        order_status: req.body.order_status,
        payment_mode: req.body.payment_mode,
        payment_date: req.body.payment_date,
        order_shipment_date: req.body.order_shipment_date,
        shipper_id: req.body.shipper_id
    };
  
    // Save Record in the database
    OrderHeaderTabeReference.create(orderHeaderContent)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
};

exports.addShipper = (req, res) => {
    // Validate request
    if (!req.body.shipper_name || !req.body.shipper_phone || !req.body.shipper_address) {
      res.status(400).send({
        message: "Customer First Name can not be empty!"
      });
      return;
    }
  
    // Create a Record
    const shipperContent = {
        shipper_name: req.body.shipper_name,
        shipper_phone: req.body.shipper_phone,
        shipper_address: req.body.shipper_address
    };
  
    // Save Record in the database
    ShipperTabeReference.create(shipperContent)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
};

exports.addProducts = (req, res) => {
    // Validate request
    if (!req.body.product_desc || !req.body.product_price) {
      res.status(400).send({
        message: "product_price or product_desc can not be empty!"
      });
      return;
    }
  
    // Create a Record
    const productContent = {
        product_desc: req.body.product_desc,
        product_class_code : req.body.product_class_code ? req.body.product_class_code : '',
        product_price: req.body.product_price,
        product_quantity_avail : req.body.product_quantity_avail ? req.body.product_quantity_avail : '',
        len : req.body.len ? req.body.len : '',
        width : req.body.width ? req.body.width : '',
        height : req.body.height ? req.body.height : '',
        weight : req.body.weight ? req.body.weight : ''
        

    };
  
    // Save Record in the database
    ProductTableReference.create(productContent)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
};

exports.addOrderItems = (req, res) => {
    // Validate request
    if (!req.body.order_id || !req.body.product_id || !req.body.product_quantity) {
      res.status(400).send({
        message: "Customer First Name can not be empty!"
      });
      return;
    }
  
    // Create a Record
    const orderItemContent = {
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        product_quantity: req.body.product_quantity,
    };
  
    // Save Record in the database
    OrderItemTableReference.create(orderItemContent)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
};

exports.addProductClass = (req, res) => {
    // Validate request
    if (!req.body.product_class_code || !req.body.product_class_desc) {
      res.status(400).send({
        message: "Customer First Name can not be empty!"
      });
      return;
    }
  
    // Create a Record
    const productClassContent = {
        product_class_code: req.body.product_class_code,
        product_class_desc: req.body.product_class_desc
    };
  
    // Save Record in the database
    ProductClassTableReference.create(productClassContent)
      .then(data => {
        res.status(201).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Record."
        });
      });
};

