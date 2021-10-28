module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
        //Add columns
        /*
            ADDRESS_ID INT(6), 
            ADDRESS_LINE1 VARCHAR(50), 
            ADDRESS_LINE2 VARCHAR(50), 
            CITY VARCHAR(30), 
            STATE VARCHAR(30), 
            PINCODE INT(6), 
            COUNTRY VARCHAR(30)
        */
        address_id : {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        address_line_1 : {
            type: Sequelize.STRING(50)
        },
        address_line_2 : {
            type: Sequelize.STRING(50)
        },
        city : {
            type: Sequelize.STRING(30)
        },
        state : {
            type: Sequelize.STRING(30)
        },
        pincode : {
            type: Sequelize.INTEGER(11)
        },
        country : {
            type: Sequelize.STRING(50)
        }
        
    })
    return Address;
}