const { DataTypes } = require("sequelize/types");
const sequelize = require('../config');
const Ciudades = require("./ciudades");

const Companias = sequelize.define(
    'Compania', {
        nombre: {
            type: DataTypes.STRING,
            notNull: true
        },
        direccion: {
            type: DataTypes.STRING,
            notNull: true
        },
        email: {
            type: DataTypes.STRING,
            notNull: true
        },
        telefono: {
            type: DataTypes.STRING,
            notNull: true
        },
        ciudad_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: Ciudades,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: "companias",
        underscored: true,
        sequelize
    }
)

module.exports = Companias;