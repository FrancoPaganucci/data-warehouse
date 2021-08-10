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
const { Ciudades, Companias, Contactos, Paises, Regiones, Usuarios } = require('./models/relations');

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
const { validarRolAdmin, validarBodyLogin, verificarLogin, validarBodyNuevoUsuario, validarUsuarioEmail } = require('./middlewares');

// ============================
// ======== ROUTING ===========
// ============================
// ================================================================================================
// =========================================== USUARIOS (CRUD) ADMINS ONLY ========================

// Create usuario (ver en la guía qué campos pide el frontend)
server.post('/usuarios', validarRolAdmin, validarBodyNuevoUsuario, validarUsuarioEmail, async (req, res) => {
  try {
    const nuevoUsuario = await Usuarios.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      perfil: req.body.perfil,
      password: req.body.password
    });
    res.status(200).json({ nuevoUsuario });
  } catch (error) {
    res.send({ error: error.message });
  }
});

// Read usuario(s)
server.get('/usuarios', validarRolAdmin, async (req, res) => {
  try {
    const UsuariosOk = await Usuarios.findAll();
    res.status(200).json(UsuariosOk);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

// Read usuario x id
server.get('/usuarios/:id', validarRolAdmin, async (req, res) => {
  try {
    const usuarioOk = await Usuarios.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(usuarioOk);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

// Update usuario
server.put('/usuarios/:usuarioId', validarRolAdmin, async (req,res) => {
  // update nombre
  if (req.body.nombre) {
    Usuarios.update(
      { nombre: req.body.nombre},
      {
        where: {
          id: req.params.usuarioId
        }
      }
    ).then(update => {
      res.status(200).json({update});
    }).catch(error => {
      res.status(400).json({ error: error.message })
    });
  }
  // update apellido
  if (req.body.apellido) {
    Usuarios.update(
      { apellido: req.body.apellido},
      {
        where: {
          id: req.params.usuarioId
        }
      }
    ).then(update => {
      res.status(200).json({update});
    }).catch(error => {
      res.status(400).json({ error: error.message })
    });
  }
  // update email
  if (req.body.email) {
    Usuarios.update(
      { email: req.body.email},
      {
        where: {
          id: req.params.usuarioId
        }
      }
    ).then(update => {
      res.status(200).json({update});
    }).catch(error => {
      res.status(400).json({ error: error.message })
    });
  }
  // update perfil
  if (req.body.perfil) {
    Usuarios.update(
      { perfil: req.body.perfil},
      {
        where: {
          id: req.params.usuarioId
        }
      }
    ).then(update => {
      res.status(200).json({update});
    }).catch(error => {
      res.status(400).json({ error: error.message })
    });
  }
  // update password
  if (req.body.password) {
    Usuarios.update(
      { password: req.body.password},
      {
        where: {
          id: req.params.usuarioId
        }
      }
    ).then(update => {
      res.status(200).json(update);
    }).catch(error => {
      res.status(400).json({ error: error.message })
    });
  }
  // si el campo no existe
  else {
    res.status(400).json({ message: "campo a actualizar inexistente"});
  }
});


// Delete usuario
// Agregar ventana emergente de confirmación en el front
server.delete('/usuarios/borrar/:usuarioId', validarRolAdmin, async (req, res) => {
  try {
    await Usuarios.destroy({
      where: {
        id: req.params.usuarioId
      }
    })
    res.status(200).json({ message: `Operación exitosa. El usuario con id ${req.params.usuarioId} ha sido eliminado`});
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

//================================================
//================================================
//================================================
// LOGIN
server.post('/login', validarBodyLogin, verificarLogin, async (req, res) => {
  // traer usuario id para mandarlo como payload en el JWT
  try {
    const thisUsuario = await Usuarios.findOne({
      where: {
        email: req.body.email
      }
    });
    console.log(thisUsuario.id)
    // sign jwt
    const token = await jwt.sign(
      {
        usuario: thisUsuario.usuario,
        email: req.body.email,
        id: thisUsuario.id
      },
      secretJWT,
      { expiresIn: "120min" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});


// ================================================================================================
// =========================================== REGION/CIUDAD (CRUD) ADMINS ONLY ===================

// =============================
// ====== CRUD REGIONES ========
// create
server.post('/regiones', validarRolAdmin, async (req, res) => {
  try {
    const nuevaRegion = await Regiones.create({
      nombre: req.body.nombre
    });
    res.status(200).json({ nuevaRegion });
  } catch (error) {
    res.send({ error: error.message });
  }
});
// read
server.get('/regiones', validarRolAdmin, async (req, res) => {
  try {
    const RegionesOk = await Regiones.findAll();
    res.status(200).json(RegionesOk);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});
// read by id
// update
server.put('/regiones/:regionId', validarRolAdmin, async (req,res) => {
  // update nombre
  if (req.body.nombre) {
    Regiones.update(
      { nombre: req.body.nombre},
      {
        where: {
          id: req.params.regionId
        }
      }
    ).then(update => {
      res.status(200).json({update});
    }).catch(error => {
      res.status(400).json({ error: error.message })
    });
  }
  // si el campo no existe
  else {
    res.status(400).json({ message: "campo a actualizar inexistente"});
  };
});
// delete
server.delete('/regiones/borrar/:regionId', validarRolAdmin, async (req, res) => {
  try {
    await Regiones.destroy({
      where: {
        id: req.params.regionId
      }
    })
    res.status(200).json({ message: `Operación exitosa. La región con id ${req.params.regionId} ha sido eliminada`});
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});



// =============================
// ====== CRUD PAISES ==========
// create
server.post('/paises', validarRolAdmin, async (req, res) => {
  // Encontrar el id para agregarlo en la foreign key
  try {
    // buscar id en la tabla 'regiones' con el id req.body.region y guardarla en VARIABLE
    const regionOk = Regiones.findOne({
      where: {
        nombre: req.body.region
      }
    })

    const nuevoPais = await Paises.create({
      nombre: req.body.nombre,
      region_id: regionOk.id
    });
    res.status(200).json({ nuevoPais });
  } catch (error) {
    res.send({ error: error.message });
  }
});
// read
server.get('/paises', validarRolAdmin, async (req, res) => {
  try {
    const paisesOk = await Paises.findAll();
    res.status(200).json(paisesOk);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});
// read by id
// update
server.put('/paises/:paisId', validarRolAdmin, (req,res) => {
  // update nombre
  if (req.body.nombre) {
    Paises.update(
      { nombre: req.body.nombre},
      {
        where: {
          id: req.params.paisId
        }
      }
    ).then(update => {
      res.status(200).json({update});
    }).catch(error => {
      res.status(400).json({ error: error.message })
    });
  }
  // si el campo no existe
  else {
    res.status(400).json({ message: "campo a actualizar inexistente"});
  };
});

// delete
server.delete('/paises/borrar/:paisId', validarRolAdmin, async (req, res) => {
  try {
    await Paises.destroy({
      where: {
        id: req.params.paisId
      }
    })
    res.status(200).json({ message: `Operación exitosa. La región con id ${req.params.paisId} ha sido eliminada`});
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

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
  });