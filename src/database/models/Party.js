import Sequelize from 'sequelize'


export default class Party extends Sequelize.Model {

    static init(sequelize, DataTypes) {
        return super.init(
            {
                count: {
                    type: DataTypes.INTEGER(11),
                    allowNull: false,
                },
                key: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
            },
            { sequelize, timestamps: false, tableName: 'party' }
        )
    }
}
