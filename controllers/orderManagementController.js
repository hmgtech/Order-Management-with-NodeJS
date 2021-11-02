const jwt = require("jsonwebtoken")
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

const errHandler = (err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving OrderItems."
  })
})

exports.addAddress = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
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
              err.message || "Some error occurred."
          });
        });
    }
  })
};

exports.addOnlineCustomer = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
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
              err.message || "Some error occurred."
          });
        });
    }
  })
};

exports.addCarton = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
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
              err.message || "Some error occurred."
          });
        });
    }
  })
};

exports.addOrderHeader = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
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
              err.message || "Some error occurred."
          });
        });
    }
  })
};

exports.addShipper = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
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
              err.message || "Some error occurred."
          });
        });
    }
  })
};

exports.addProducts = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
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
          res.status(201).send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred."
          });
        });
    }
  })
};

exports.addOrderItems = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
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
              err.message || "Some error occurred."
          });
        });
    }
  })
};

exports.addProductClass = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
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
              err.message || "Some error occurred."
          });
        });
    }
  })
};

exports.getAllAddress = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
      AddressTableReference.findAll()
        .then(data => {
          res.send(data).status(200)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred."
          });
        });
    }
  })
}

exports.getAddress = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
      const id = req.params.id;
      AddressTableReference.findByPk(id)
        .then(data => {
          console.log("res data: ", data);
          res.status(200).send(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred."
          });
        });
    }
  })
}

exports.getCustomer = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
      const input_username = req.body.username; //we can add email also

      // Validate request
      if (!input_username) {
        res.status(400).send({
          message: "Username can not be empty!"
        });
        return;
      }
      var condition = { customer_username: input_username }

      OnlineCustomerTableReference.findOne({ where: condition })
        .then(data => {
          console.log("res data: ", data);
          res.status(200).send(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred."
          });
        });
    }
  })
}

exports.updateAddress = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
      const id = req.params.id;
      AddressTableReference.update(req.body, {
        where: { address_id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "OrderItem was updated successfully."
            });
          } else {
            res.send({
              message: `Cannot update OrderItem with id=${id}. Maybe OrderItem was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating OrderItem with id=" + id
          });
        });
    }
  })
}

exports.deleteAddress = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
      const id = req.params.id;

      AddressTableReference.destroy({
        where: { address_id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "OrderItem was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete OrderItem with id=${id}. Maybe OrderItem was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete OrderItem with id=" + id
          });
        });
    }
  })
}

exports.deleteAllAddress = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
      AddressTableReference.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} OrderItems were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all OrderItems."
          })
        })
    }
  })
}

exports.getAddressByState = (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred."
      })
    }
    else {
      const state = req.params.ch;
      console.log("State: " + state);
      var condition = state ? { state: { [Op.like]: `%${state}%` } } : null;

      AddressTableReference.findAll({ where: condition })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving OrderItems."
          });
        });
    }
  })
}

exports.jwtLogin = (req, res) => {
  const input_username = req.body.username; //we can add email also

  // Validate request
  if (!input_username) {
    res.status(400).send({
      message: "Username can not be empty!"
    });
    return;
  }
  var condition = { customer_username: input_username }
  OnlineCustomerTableReference.findOne({ where: condition })
    .then(data => {
      console.log("res data: ", data['dataValues']);
      jwt.sign({ user: data }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
        res.send({
          token: token
        })
      })
    })
    .catch(err => {
      res.status(403).send({
        message:
          err.message || "Some error occurred."
        // "Forbidden"
      });
    });
}
