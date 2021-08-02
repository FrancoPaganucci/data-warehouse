const { DataTypes } = require("sequelize/types");
const sequelize = require('../config');

const Usuarios = sequelize.define(
    'Usuario', {
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
        perfil: {
           type: DataTypes.ENUM('admin','basico'),
           notNull: true
        },
        password: {
            type: DataTypes.STRING,
            notNull: true
        }
    }, {
        timestamps: false,
        tableName: "usuarios",
        underscored: true,
        sequelize
    }
)

module.exports = Usuarios;