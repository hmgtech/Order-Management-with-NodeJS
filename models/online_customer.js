module.exports = (sequelize, Sequelize) => {
    const Online_Customer = sequelize.define("online_customer", {
        //Add columns
        /*
            CUSTOMER_ID INT(6), 
            CUSTOMER_FNAME VARCHAR(20), 
            CUSTOMER_LNAME VARCHAR(20), 
            CUSTOMER_EMAIL VARCHAR(30), 
            CUSTOMER_PHONE BIGINT(10), 
            ADDRESS_ID INT(6), 
            CUSTOMER_CREATION_DATE DATE, 
            CUSTOMER_USERNAME VARCHAR(20), 
            CUSTOMER_GENDER CHAR(1)
        */
        customer_id : {
            type: Sequelize.INTEGER(6),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        customer_fname : {
            type: Sequelize.STRING(20)
        },
        customer_lname : {
            type: Sequelize.STRING(20)
        },
        customer_email : {
            type: Sequelize.STRING(30),
            unique: true
        },
        customer_phone : {
            type: Sequelize.BIGINT(10)
        },
        address_id : { //address id can be removed as sequelize will automatically add it when it see it as FK
            type: Sequelize.INTEGER(11),
        },
        customer_creation_date :{ 
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW') //Sequelize.NOW
        },
        customer_username : {
            type: Sequelize.STRING(20)
        },
        customer_gender : {
            type: Sequelize.CHAR(1)
        }
        
    })
    return Online_Customer;
}