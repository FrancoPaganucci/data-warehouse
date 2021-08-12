const Ciudades = require('./ciudades');
const Companias = require('./companias');
const Contactos = require('./contactos');
const Paises = require('./paises');
const Regiones = require('./regiones');
const Usuarios = require('./usuarios');

Companias.hasMany(Contactos, {
    foreignKey: "compania_id"
});

Regiones.hasMany(Paises, {
    foreignKey: "region_id"
});

Paises.hasMany(Ciudades, {
    foreignKey: "pais_id"
});

Paises.belongsTo(Regiones, {
    foreignKey: "region_id"
})


// Patrón de "decorador", importo, decoro con relaciones, vuelvo a exportar
module.exports = { Ciudades, Companias, Contactos, Paises, Regiones, Usuarios };