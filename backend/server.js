const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const secretJWT = process.env.JWT_SECRET;

// database
const db = require('./config');

// instancia de Express
const server = express();
const PORT = process.env.APP_PORT;
// instanciar modelos

// middlewares
server.use(helmet());
server.use(express.json());
server.use(compression());
server.use(cors());
server.use(
    expressJwt({
      secret: secretJWT,
      algorithms: ["HS256"],
    }).unless({
      path: ["/login"]
    })
  );

// importar MIDDLEWARES DE VALIDACIÓN

// ============================
// ======== ROUTING ===========
// ============================
// ================================================================================================
// =========================================== USUARIOS (CRUD) ADMINS ONLY ========================

// Create usuario (ver en la guía qué campos pide el frontend)

// Read usuario(s)

// Update usuario

// Delete usuario


// ================================================================================================
// =========================================== REGION/CIUDAD (CRUD) ADMINS ONLY ===================

// =============================
// ====== CRUD REGIONES ========
// create
// read
// update
// delete

// =============================
// ====== CRUD PAISES ==========
// create
// read
// update
// delete

// =============================
// ====== CRUD CIUDADES ========
// create
// read
// update
// delete


// ================================================================================================
// =========================================== COMPANIAS (CRUD) ADMINS ONLY =======================
// create
// read
// update
// delete


// ================================================================================================
// =========================================== CONTACTOS (CRUD) ===================================
// create
// read
// update
// delete


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
  })