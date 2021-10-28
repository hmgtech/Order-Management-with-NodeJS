module.exports = (sequelize, Sequelize) => {
    const Carton = sequelize.define("carton", {
        //Add columns
        /*
            CARTON_ID INT(6), 
            LEN BIGINT(10), 
            WIDTH BIGINT(10),
            HEIGHT BIGINT(10)
        */
        carton_id : {
            type: Sequelize.INTEGER(6),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        len : {
            type: Sequelize.BIGINT(10)
        },
        width : {
            type: Sequelize.BIGINT(10)
        },
        height : {
            type: Sequelize.BIGINT(10)
        }        
    })
    return Carton;
}