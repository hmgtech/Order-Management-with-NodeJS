const jwt = require("jsonwebtoken")
var bcrypt = require('bcrypt');
const HttpStatus = require('http-status-codes').StatusCodes;
require("dotenv").config()

const db = require("../models");
const { errorHandler, accessDenied, badRequest, successfullyDeleted, allFieldsRequired, notDeleted, internalServerError, notUpdated, successfullyUpdated } = require('../tools/errorHandler');
const errorMessages = require("../tools/errorMessages");
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

exports.addAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    }) 
  }
  else {
    // Validate request
    if (!req.body.address_line_1 || !req.body.pincode) {
      res.status(HttpStatus.BAD_REQUEST).send({
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
        res.status(HttpStatus.CREATED).send(data);
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        // console.log(status);
        res.status(status).send({
          message: message
        });
      });
  }
};

exports.signup = async (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    // Validate request
    if (!req.body.customer_fname || !req.body.email ||
      !req.body.address_id || !req.body.username ||
      !req.body.gender || !req.body.password) {
        const {status, message} = allFieldsRequired()
        res.status(status).send({
          message: message
        })
      return;
    }
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const onlineCustomerContent = {
      customer_fname: req.body.customer_fname,
      customer_lname: req.body.customer_lname ? req.body.customer_lname : '',
      customer_email: req.body.email,
      customer_phone: req.body.phone ? req.body.phone : '',
      customer_address_id: req.body.address_id,
      customer_username: req.body.username,
      customer_gender: req.body.gender,
      customer_password: hashedPassword
    };

    // Save Record in the database
    OnlineCustomerTableReference.create(onlineCustomerContent)
      .then(data => {
        res.status(HttpStatus.CREATED).send(data);
      })
      .catch(err => {
        if (err.message === "Validation error"){
          res.status(HttpStatus.BAD_REQUEST).send({
            message: errorMessages.USERNAME_ALREADY_TAKEN
          });
        }
        else{
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message:
              err.message || errorMessages.SOMETHING_WENT_WRONG
          });
        }
      });
  }
};

exports.addCarton = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    // Validate request
    if (!req.body.len || !req.body.width ||
      !req.body.height) {
        const {status, message} = allFieldsRequired()
        res.status(status).send({
          message: message
        })
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
        res.status(HttpStatus.CREATED).send(data);
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
};

exports.addOrderHeader = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    // Validate request
    if (!req.body.customer_id || !req.body.order_date || !req.body.shipper_id ||
      !req.body.payment_mode) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: "Customer ID, Order Date, ShipperID and Payment mode is required."
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
        res.status(HttpStatus.CREATED).send(data);
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
};

exports.addShipper = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    // Validate request
    if (!req.body.shipper_name || !req.body.shipper_phone || !req.body.shipper_address) {
      const {status, message} = allFieldsRequired()
        res.status(status).send({
          message: message
        })
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
        res.status(HttpStatus.CREATED).send(data);
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
};

exports.addProducts = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    // Validate request
    if (!req.body.product_desc || !req.body.product_price) {
      const {status, message} = allFieldsRequired()
        res.status(status).send({
          message: message
        })
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
        res.status(HttpStatus.CREATED).send(data);
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
};

exports.addOrderItems = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    // Validate request
    if (!req.body.order_id || !req.body.product_id || !req.body.product_quantity) {
      const {status, message} = allFieldsRequired()
        res.status(status).send({
          message: message
        })
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
        res.status(HttpStatus.CREATED).send(data);
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
};

exports.addProductClass = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    // Validate request
    if (!req.body.product_class_code || !req.body.product_class_desc) {
      const {status, message} = allFieldsRequired()
        res.status(status).send({
          message: message
        })
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
        res.status(HttpStatus.CREATED).send(data);
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
};

exports.getAllAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    AddressTableReference.findAll()
      .then(data => {
        res.send(data).status(HttpStatus.OK)
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
}

exports.getAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    const id = req.params.id;
    AddressTableReference.findByPk(id)
      .then(data => {
        // console.log("res data: ", data);
        res.status(HttpStatus.OK).send(data)
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
}

exports.getCustomer = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    const input_username = req.body.username; //we can add email also

    // Validate request
    if (!input_username) {
      res.status(HttpStatus.BAD_REQUEST).send({
        message: errorMessages.ALL_FIELD_REQUIRED
      });
      return;
    }
    var condition = { customer_username: input_username }

    OnlineCustomerTableReference.findOne({ where: condition })
      .then(data => {
        // console.log("res data: ", data);
        res.status(HttpStatus.OK).send(data)
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
}

exports.updateAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    const id = req.params.id;
    AddressTableReference.update(req.body, {
      where: { address_id: id }
    })
      .then(num => {
        if (num == 1) {
          const {status, message} = successfullyUpdated(num)
          res.status(status).send({
            message: message
          })
        } 
        else {
          const {status, message} = notUpdated(id)
          res.status(status).send({
            message: message
          })
        }
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
}

exports.deleteAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    const id = req.params.id;

    AddressTableReference.destroy({
      where: { address_id: id }
    })
      .then(num => {
        if (num == 1) {
          const {status, message} = successfullyDeleted(num)
          res.status(status).send({
            message: message
          })
        } 
        else {
          const {status, message} = notDeleted(id)
          res.status(status).send({
            message: message
          })
        }
      })
      .catch(err => {
        const {status, message} = notDeleted(id)
          res.status(status).send({
            message: message
          })
      });
  }
}

exports.deleteAllAddress = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    AddressTableReference.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        const {status, message} = successfullyDeleted(nums)
          res.status(status).send({
            message: message
          })
      })
      .catch(err => {
        const {status, message} = errorHandler(err, req)
        res.status(status).send({
          message: message
        });
      });
  }
}

exports.getAddressByState = (req, res) => {
  var verificationStatus = authenticateUser(req)
  if (verificationStatus === false) {
    const {status, message} = accessDenied()
    res.status(status).send({
      message: message
    })
  }
  else {
    const state = req.params.ch;
    // console.log("State: " + state);
    var condition = state ? { state: { [Op.like]: `%${state}%` } } : null;

    AddressTableReference.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        const {status, message} = internalServerError(err)
        res.status(status).send({
          message: message
        })
      });
  }
}

exports.jwtLogin = async (req, res) => {
  const input_username = req.body.username; //we can add email also
  const password = req.body.password;

  // Validate request
  if (!input_username || !password) {
    res.status(HttpStatus.BAD_REQUEST).send({
      message: errorMessages.ALL_FIELD_REQUIRED
    });
  }
  var condition = [{ customer_username: input_username }]
  OnlineCustomerTableReference.findOne({ where: condition })
    .then(data => {
      // console.log("res data: ", data['dataValues']);
      // console.log("decrypt: "+(password));
      if (data === null){
        res.status(HttpStatus.NOT_FOUND).send({
          message:errorMessages.INVALID_USERNAME // "Forbidden"
        });
      }
      bcrypt.compare(req.body.password, data['dataValues']['customer_password'])
      .then(result => {
        if (result){
          jwt.sign({ user: data }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME }, (err, token) => {
            res.send({
              token: token
            })
          })
        }
        else{
          res.status(HttpStatus.FORBIDDEN).send({
            message: errorMessages.INVALID_PASSWORD // "Forbidden"
          });
        }
      })
      .catch(err => {
        res.status(HttpStatus.NOT_FOUND).send({
          message:err.message // "Forbidden"
        });
      });
    })      
    .catch(err => {
      res.status(HttpStatus.NOT_FOUND).send({
        message:err.message // "Forbidden"
      });
    });
}
