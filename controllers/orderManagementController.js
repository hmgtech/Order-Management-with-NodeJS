const jwt = require("jsonwebtoken")
var bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes').StatusCodes;
require("dotenv").config()

const db = require("../models");
const { errorHandler, accessDenied, badRequest, successfullyDeleted, allFieldsRequired, 
        notDeleted, internalServerError, notUpdated, successfullyUpdated,
        successfullyCreated, successfullyRetrived, notFound } = require('../tools/apiResponses');
const errorMessages = require("../tools/apiResponseMessages");
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

function authenticateUser(req) {
  try {
    var decoded = jwt.verify(req.token, process.env.SECRET_KEY);
    return true
  } catch (err) {
    return false
  }
}

function conslidateResponse(timestamp, status, message, error=undefined, data=undefined){
  let responseObj = {
    timestamp: timestamp,
    status: status,
    message: message
  }
  if (error != undefined){
    responseObj.error = error
  }
  if (data != undefined){
    responseObj.data = data
  }
  return responseObj  
}

exports.addAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    // Validate request
    if (!req.body.address_line_1 || !req.body.address_line_2 || !req.body.city || !req.body.state || !req.body.pincode || !req.body.country) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
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
        const { status, message, timestamp } = successfullyCreated()
        responseObj = conslidateResponse(timestamp, status, message, undefined, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
};

exports.signup = async (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
    return
  }
  else {
    // Validate request
    if (!req.body.customer_fname || !req.body.email ||
      !req.body.address_id || !req.body.username ||
      !req.body.gender || !req.body.password) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
      return;
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const onlineCustomerContent = {
      customer_fname: req.body.customer_fname,
      customer_lname: req.body.customer_lname ? req.body.customer_lname : '',
      customer_email: req.body.email,
      customer_phone: req.body.phone ? req.body.phone : '',
      address_id: req.body.address_id,
      customer_username: req.body.username,
      customer_gender: req.body.gender,
      customer_password: hashedPassword
    };

    // Save Record in the database
    OnlineCustomerTableReference.create(onlineCustomerContent)
      .then(data => {
        const { status, message, timestamp } = successfullyCreated()
        responseObj = conslidateResponse(timestamp, status, message, error, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        var datetime = new Date();
        if (err.message === "Validation error") {
          responseObj = conslidateResponse(datetime, HttpStatus.BAD_REQUEST, errorMessages.USERNAME_ALREADY_TAKEN, errorMessages.BAD_REQUEST)
          res.status(HttpStatus.BAD_REQUEST).send(responseObj)
        }
        else {
          responseObj = conslidateResponse(datetime, HttpStatus.INTERNAL_SERVER_ERROR, err.message || errorMessages.SOMETHING_WENT_WRONG, errorMessages.INTERNAL_SERVER_ERROR)
          res.status(HttpStatus.BAD_REQUEST).send(responseObj)
        }
      });
  }
};

exports.addCarton = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    // Validate request
    if (!req.body.len || !req.body.width ||
      !req.body.height) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
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
        const { status, message, timestamp } = successfullyCreated()
        responseObj = conslidateResponse(timestamp, status, message, error, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
};

exports.addOrderHeader = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    // Validate request
    if (!req.body.customer_id || !req.body.order_date || !req.body.shipper_id ||
      !req.body.payment_mode || !req.body.order_status || !req.body.payment_date || !req.body.order_shipment_date) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
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
        const { status, message, timestamp } = successfullyCreated()
        responseObj = conslidateResponse(timestamp, status, message, error, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
};

exports.addShipper = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    // Validate request
    if (!req.body.shipper_name || !req.body.shipper_phone || !req.body.shipper_address) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
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
        const { status, message, timestamp } = successfullyCreated()
        responseObj = conslidateResponse(timestamp, status, message, error, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
};

exports.addProducts = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    // Validate request
    if (!req.body.product_desc || !req.body.product_price) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
      return;
    }

    // Create a Record
    const productContent = {
      product_desc: req.body.product_desc,
      product_class_code: req.body.product_class_code ? req.body.product_class_code : '',
      product_price: req.body.product_price,
      product_quantity_avail: req.body.product_quantity_avail ? req.body.product_quantity_avail : '',
      len: req.body.len ? req.body.len : '',
      width: req.body.width ? req.body.width : '',
      height: req.body.height ? req.body.height : '',
      weight: req.body.weight ? req.body.weight : ''
    };

    // Save Record in the database
    ProductTableReference.create(productContent)
      .then(data => {
        const { status, message, timestamp } = successfullyCreated()
        responseObj = conslidateResponse(timestamp, status, message, error, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
};

exports.addOrderItems = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    // Validate request
    if (!req.body.order_id || !req.body.product_id || !req.body.product_quantity) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
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
        const { status, message, timestamp } = successfullyCreated()
        responseObj = conslidateResponse(timestamp, status, message, error, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
};

exports.addProductClass = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    // Validate request
    if (!req.body.product_class_code || !req.body.product_class_desc) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
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
        const { status, message, timestamp } = successfullyCreated()
        responseObj = conslidateResponse(timestamp, status, message, error, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
};

exports.getAllAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    AddressTableReference.findAll()
      .then(data => {
        const { status, message, timestamp } = successfullyRetrived()
        responseObj = conslidateResponse(timestamp, status, message, undefined, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
}

exports.getAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    const id = req.params.id;
    // Validate request
    if (!id) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
      return;
    }
    AddressTableReference.findByPk(id)
      .then(data => {
        // console.log("res data: ", data);
        const { status, message, timestamp } = successfullyRetrived()
        responseObj = conslidateResponse(timestamp, status, message, undefined, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
}

exports.getCustomer = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    const input_username = req.body.username; //we can add email also

    // Validate request
    if (!input_username) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
      return;
    }
    var condition = { customer_username: input_username }

    OnlineCustomerTableReference.findOne({ where: condition })
      .then(data => {
        // console.log("res data: ", data);
        if (data === null) {
          const { status, message, error, timestamp } = notFound(input_username)
          responseObj = conslidateResponse(timestamp, status, message, error)
          res.status(status).send(responseObj)
          return;
        }
        const { status, message, timestamp } = successfullyRetrived()
        responseObj = conslidateResponse(timestamp, status, message, undefined, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
}

exports.updateAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    const id = req.params.id;
    // Validate request
    if (!id) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
      return;
    }
    AddressTableReference.update(req.body, {
      where: { address_id: id }
    })
      .then(num => {
        if (num == 1) {
          const { status, message, timestamp } = successfullyUpdated(num)
          responseObj = conslidateResponse(timestamp, status, message)
          res.status(status).send(responseObj)
        }
        else {
          const { status, message, error, timestamp } = notUpdated(id)
          responseObj = conslidateResponse(timestamp, status, message, error)
          res.status(status).send(responseObj)
        }
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
}

exports.deleteAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    const id = req.params.id;
    // Validate request
    if (!id) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
      return;
    }
    AddressTableReference.destroy({
      where: { address_id: id }
    })
      .then(num => {
        if (num == 1) {
          const { status, message, timestamp } = successfullyDeleted(num)
          responseObj = conslidateResponse(timestamp, status, message)
          res.status(status).send(responseObj)
        }
        else {
          const { status, message, error, timestamp } = notDeleted(id)
          responseObj = conslidateResponse(timestamp, status, message, error)
          res.status(status).send(responseObj)
        }
      })
      .catch(err => {
        const { status, message, error, timestamp } = notDeleted(id)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
}

exports.deleteAllAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    AddressTableReference.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        const { status, message, timestamp } = successfullyDeleted(nums)
        responseObj = conslidateResponse(timestamp, status, message)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = errorHandler(err, req)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
}

exports.getAddressByState = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const { status, message, error, timestamp } = accessDenied()
    responseObj = conslidateResponse(timestamp, status, message, error)
    res.status(status).send(responseObj)
  }
  else {
    const state = req.params.ch;
    // Validate request
    if (!state) {
      const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
      return;
    }
    // console.log("State: " + state);
    var condition = state ? { state: { [Op.like]: `%${state}%` } } : null;

    AddressTableReference.findAll({ where: condition })
      .then(data => {
        if (data === null) {
          const { status, message, error, timestamp } = notFound(state)
          responseObj = conslidateResponse(timestamp, status, message, error)
          res.status(status).send(responseObj)
          return;
        }
        const { status, message, timestamp } = successfullyRetrived()
        responseObj = conslidateResponse(timestamp, status, message, undefined, data)
        res.status(status).send(responseObj)
      })
      .catch(err => {
        const { status, message, error, timestamp } = internalServerError(err)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
      });
  }
}

exports.jwtLogin = async (req, res) => {
  const input_username = req.body.username; //we can add email also
  const password = req.body.password;

  // Validate request
  if (!input_username || !password) {
    const { status, message, error, timestamp } = allFieldsRequired()
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
  }
  var condition = [{ customer_username: input_username }]
  OnlineCustomerTableReference.findOne({ where: condition })
    .then(data => {
      if (data === null) {
        const { status, message, error, timestamp } = notFound(input_username)
        responseObj = conslidateResponse(timestamp, status, message, error)
        res.status(status).send(responseObj)
        return;
      }
      bcrypt.compare(req.body.password, data['dataValues']['customer_password'])
        .then(result => {
          if (result) {
            jwt.sign({ user: data }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME }, (err, token) => {
              const { status, message, timestamp } = successfullyRetrived()
              let data = {token: token}
              responseObj = conslidateResponse(timestamp, status, message, undefined, data)
              res.status(status).send(responseObj)
            })
          }
          else {
            const { status, message, error, timestamp } = accessDenied()
            responseObj = conslidateResponse(timestamp, status, message, error)
            res.status(status).send(responseObj)
          }
        })
        .catch(err => {
          const { status, message, error, timestamp } = internalServerError(err)
          responseObj = conslidateResponse(timestamp, status, message, error)
          res.status(status).send(responseObj)
        });
    })
    .catch(err => {
      const { status, message, error, timestamp } = internalServerError(err)
      responseObj = conslidateResponse(timestamp, status, message, error)
      res.status(status).send(responseObj)
    });
}
