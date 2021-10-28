// Improting db config and sequelize
const dbConfig = require("../config/db_config.js");
const Sequelize = require("sequelize");

// Initializing sequelize with database config
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//Declaring db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adding Model in db Object
db.address = require("./address")(sequelize, Sequelize);
db.address = require("./carton")(sequelize, Sequelize);
db.address = require("./online_customer")(sequelize, Sequelize);
db.address = require("./order_header")(sequelize, Sequelize);
db.address = require("./order_item")(sequelize, Sequelize);
db.address = require("./product_class")(sequelize, Sequelize);
db.address = require("./product")(sequelize, Sequelize);
db.address = require("./shipper")(sequelize, Sequelize);

module.exports = db;