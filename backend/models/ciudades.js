const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Paises = require("./paises");

const Ciudades = sequelize.define(
    'Ciudad', {
        nombre: {
            type: DataTypes.STRING,
            notNull: true
        },
        pais_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: Paises,
                key: "id"
            }
        }
    }, {
        timestamps: false,
        tableName: "ciudades",
        underscored: true,
        sequelize
    }
)

module.exports = Ciudades;