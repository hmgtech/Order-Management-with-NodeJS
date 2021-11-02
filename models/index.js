// Improting db config and sequelize
const dbConfig = require("../config/db_config.js");
const Sequelize = require("sequelize");

// Initializing sequelize with database config
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

sequelize.authenticate()
.then(() => {
    console.log("Connected")
})
.catch(err => {
    console.log('Error: '+err)
})
//Declaring db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Adding Model in db Object
db.address = require("./address")(sequelize, Sequelize);
db.carton = require("./carton")(sequelize, Sequelize);
db.online_customer = require("./online_customer")(sequelize, Sequelize);
db.order_header = require("./order_header")(sequelize, Sequelize);
db.order_item = require("./order_item")(sequelize, Sequelize);
db.product_class = require("./product_class")(sequelize, Sequelize);
db.product = require("./product")(sequelize, Sequelize);
db.shipper = require("./shipper")(sequelize, Sequelize);


// Associations

// Online Customer
db.address.hasMany(db.online_customer, {foreignKey: 'address_id', onDelete: 'cascade', hooks:true})
//Address
db.online_customer.belongsTo(db.address, {foreignKey: 'address_id'})

//order header
db.online_customer.hasMany(db.order_header, {foreignKey: 'customer_id', onDelete: 'cascade', hooks:true})
//Online Customer
db.order_header.belongsTo(db.online_customer, {foreignKey: 'customer_id'})
//order header
db.shipper.hasMany(db.order_header, {foreignKey: 'shipper_id', onDelete: 'cascade', hooks:true})
//Shipper
db.order_header.belongsTo(db.shipper, {foreignKey: 'shipper_id'})

//order item
db.order_header.hasMany(db.order_item, {foreignKey: 'order_id', onDelete: 'cascade', hooks:true})
//order header
db.order_item.belongsTo(db.order_header, {foreignKey: 'order_id'})
//order item
db.product.hasMany(db.order_item, {foreignKey: 'product_id', onDelete: 'cascade', hooks:true})
//product
db.order_item.belongsTo(db.product, {foreignKey: 'product_id'})

// product_class
db.product.hasMany(db.product_class, {foreignKey: 'product_id', onDelete: 'cascade', hooks:true})
// product
db.product_class.belongsTo(db.product, {foreignKey: 'product_id'})

//Shipper
db.address.hasMany(db.shipper, {foreignKey: 'shipper_addresss', onDelete: 'cascade', hooks:true})
//Address
db.shipper.belongsTo(db.address, {foreignKey: 'shipper_addresss'})

module.exports = db;