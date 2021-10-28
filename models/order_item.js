module.exports = (sequelize, Sequelize) => {
    const Order_Item = sequelize.define("order_item", {
        //Add columns
        /*
            ORDER_ID INT(6), 
            PRODUCT_ID INT(6), 
            PRODUCT_QUANTITY INT(3)
            */
        // order_id : { //order_id can be removed as sequelize will automatically add it when it see it as FK
        //     type: Sequelize.INTEGER(6)
        // },
        // product_id : { //product_id can be removed as sequelize will automatically add it when it see it as FK
        //     type: Sequelize.INTEGER(6)
        // },
        product_quantity : {
            type: Sequelize.INTEGER(3)
        }
        
    },
    {
        underscored: true,
        paranoid: false
    })
    return Order_Item;
}