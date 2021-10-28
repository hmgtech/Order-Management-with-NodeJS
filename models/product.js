module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        //Add columns
        /*
            PRODUCT_ID INT(6), 
            PRODUCT_DESC VARCHAR(60), 
            PRODUCT_CLASS_CODE INT(4), 
            PRODUCT_PRICE DECIMAL(12,2), 
            PRODUCT_QUANTITY_AVAIL INT(4), 
            LEN INT(5), 
            WIDTH INT(5), 
            HEIGHT INT(5), 
            WEIGHT DECIMAL(10,4)
            */
        product_id : {
            type: Sequelize.INTEGER(6),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        product_desc : {
            type: Sequelize.STRING(60)
        },
        product_class_code : {
            type: Sequelize.INTEGER(4)
        },
        product_price : {
            type: Sequelize.DECIMAL(12,2)
        },
        product_quantity_avail : {
            type: Sequelize.INTEGER(4)
        },
        len : {
            type: Sequelize.INTEGER(5)
        },
        width : {
            type: Sequelize.INTEGER(5)
        },
        height : {
            type: Sequelize.INTEGER(5)
        },
        weight: {
            type: Sequelize.DECIMAL(12,2)
        }
        
    },
    {
        underscored: true,
        paranoid: false
    })
    return Product;
}