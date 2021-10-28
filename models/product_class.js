module.exports = (sequelize, Sequelize) => {
    const Product_Class = sequelize.define("product_class", {
        //Add columns
        /*
            PRODUCT_CLASS_CODE INT(4), 
		    PRODUCT_CLASS_DESC VARCHAR(40)
            */
        // product_class_code : { //product_class_code can be removed as sequelize will automatically add it when it see it as FK
        //     type: Sequelize.INTEGER(4)
        // },
        product_class_desc : {
            type: Sequelize.STRING(60)
        }        
    },
    {
        underscored: true,
        paranoid: false
    })
    return Product_Class;
}