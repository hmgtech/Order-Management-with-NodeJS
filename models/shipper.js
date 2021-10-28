module.exports = (sequelize, Sequelize) => {
    const Shipper = sequelize.define("shipper", {
        //Add columns
        /*
            SHIPPER_ID INT(6), 
            SHIPPER_NAME VARCHAR(30), 
            SHIPPER_PHONE BIGINT(12), 
            SHIPPER_ADDRESS INT(6)
            */
        shipper_id : {
            type: Sequelize.INTEGER(6),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        shipper_name : {
            type: Sequelize.STRING(30)
        },
        shipper_phone : {
            type: Sequelize.BIGINT(12)
        },
        // shipper_address : { //shipper_address can be removed as sequelize will automatically add it when it see it as FK
        //     type: Sequelize.INTEGER(6)
        // }
        
    },
    {
        underscored: true,
        paranoid: false
    })
    return Shipper;
}