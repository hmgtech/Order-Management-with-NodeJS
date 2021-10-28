module.exports = (sequelize, Sequelize) => {
    const Order_Header = sequelize.define("order_header", {
        //Add columns
        /*
            ORDER_ID INT(6), 
            CUSTOMER_ID INT(6), 
            ORDER_DATE DATE, 
            ORDER_STATUS VARCHAR(10), 
            PAYMENT_MODE VARCHAR(20), 
            PAYMENT_DATE DATE, 
            ORDER_SHIPMENT_DATE DATE, 
            SHIPPER_ID INT(6)
            */
        order_id : {
            type: Sequelize.INTEGER(6),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        customer_id : { //customer_id can be removed as sequelize will automatically add it when it see it as FK
            type: Sequelize.INTEGER(6)
        },
        order_date :{ 
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW') //Sequelize.NOW
        },
        order_status : {
            type: Sequelize.STRING(10)
        },
        payment_mode : {
            type: Sequelize.STRING(20)
        },
        payment_date :{ 
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW') //Sequelize.NOW
        },
        order_shipment_date :{ 
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW') //Sequelize.NOW
        },
        shipper_id : {
            type: Sequelize.INTEGER(6)
        }
        
    })
    return Order_Header;
}