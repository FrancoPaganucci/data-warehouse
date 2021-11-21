const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const expressJwt = require("express-jwt");
const secretJWT = process.env.JWT_SECRET;
// database
const db = require('./config');
// instancia de Express
const server = express();
const PORT = process.env.APP_PORT;
// middlewares globales
server.use(helmet());
server.use(express.json());
server.use(compression());
server.use(cors());
server.use(
    expressJwt({
      secret: secretJWT,
      algorithms: ["HS256"],
    }).unless({
      path: ["/auth/login"]
    })
  );

// ============================
// ======== ROUTING ===========
// ============================
// USUARIOS
const usuariosRoutes = require('./routes/usuariosRoutes');
server.use('/usuarios', usuariosRoutes);
//================================================
// LOGIN
const authRoutes = require('./routes/authRoutes');
server.use('/auth', authRoutes);
//================================================
// REGIONES
const regionesRoutes = require('./routes/regionesRoutes');
server.use('/regiones', regionesRoutes);
//================================================
// PAISES
const paisesRoutes = require('./routes/paisesRoutes');
server.use('/paises', paisesRoutes);
//================================================
// CIUDADES
const ciudadesRoutes = require('./routes/ciudadesRoutes');
server.use('/ciudades', ciudadesRoutes);
//================================================
// COMPAÑÍAS
const companiasRoutes = require('./routes/companiasRoutes');
server.use('/companias', companiasRoutes);
//================================================
// CONTACTOS
const contactosRoutes = require('./routes/contactosRoutes');
server.use('/contactos', contactosRoutes);

// FALTAN VALIDACIONES !! CHEQUEAR QUE EN LOS POST NO SE REPITAN LOS VALORES EN LA BASE (ej: crear un pais/ciudad/region que ya exista en la DB)

// ===============================================================================================
//=================================== INICIALIZAR EL SERVIDOR ====================================
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    // Conectarse a la base de datos cuando levanta el servidor
    db.authenticate().then(() => {
      console.log("Succesfully connected to database");
    }).catch(error => {
      console.log("Se ha producido un error: " + error);
    });
  });