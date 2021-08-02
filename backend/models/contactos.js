const { DataTypes } = require("sequelize/types");
const sequelize = require('../config');
const Companias = require("./companias");

const Contactos = sequelize.define(
    'Contacto', {
        nombre: {
            type: DataTypes.STRING,
            notNull: true
        },
        apellido: {
            type: DataTypes.STRING,
            notNull: true
        },
        email: {
            type: DataTypes.STRING,
            notNull: true
        },
        cargo: {
            type: DataTypes.STRING,
            notNull: true
        },
        compania_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: Companias,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: "contactos",
        underscored: true,
        sequelize
    }
)

module.exports = Contactos;