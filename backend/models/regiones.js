const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Regiones = sequelize.define(
    'Region', {
        nombre: {
            type: DataTypes.STRING,
            notNull: true
        }
    }, {
        timestamps: false,
        tableName: "regiones",
        underscored: true,
        sequelize
    }
)

module.exports = Regiones;