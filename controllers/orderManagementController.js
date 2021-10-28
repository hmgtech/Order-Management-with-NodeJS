const db = require("../models");
const Op = db.Sequelize.Op;

// Intializing Tables
const AddressTableReference = db.address
const OnlineCustomerTableReference = db.online_customer

exports.addAddress = (req, res) => {
    // Validate request
    if (!req.body.address_line_1 || !req.body.pincode) {
      res.status(400).send({
        message: "ADDRESS LINE-1 Or PINCODE can not be empty!"
      });
      return;
    }
  
    // Create a OrderItem
    const addressContent = {
        address_line_1: req.body.address_line_1,
        address_line_2: req.body.address_line_2 ? req.body.address_line_2 : '',
        city: req.body.city ? req.body.city : '',
        state: req.body.state ? req.body.state : '',
        pincode: req.body.pincode,
        country: req.body.country ? req.body.country : ''
    };
  
    // Save OrderItem in the database
    AddressTableReference.create(addressContent)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the OrderItem."
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
  
    // Create a OrderItem
    const onlineCustomerContent = {
        customer_fname: req.body.customer_fname,
        customer_lname: req.body.customer_lname ? req.body.customer_lname : '',
        email: req.body.email,
        phone: req.body.phone ? req.body.phone : '',
        address_id: req.body.address_id,
        username: req.body.username,
        gender: req.body.gender,
    };
  
    // Save OrderItem in the database
    OnlineCustomerTableReference.create(onlineCustomerContent)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the OrderItem."
        });
      });
};
  



