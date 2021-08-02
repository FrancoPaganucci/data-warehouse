const { DataTypes } = require("sequelize/types");
const sequelize = require('../config');
const Regiones = require("./regiones");

const Paises = sequelize.define(
    'Pais', {
        nombre: {
            type: DataTypes.STRING,
            notNull: true
        },
        region_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            references: {
                model: Regiones,
                key: "id"
            }
        }
    }, {
        timestamps: false,
        tableName: "paises",
        underscored: true,
        sequelize
    }
)

module.exports = Paises;