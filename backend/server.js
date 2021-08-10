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
// instanciar modelos (ya no es necesario una vez que está todo separado en controladores y rutas)
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
      path: ["/auth/login"]
    })
  );

// importar MIDDLEWARES DE VALIDACIÓN ya no es necesario una vez que está todo separado por controladores y rutas
const { validarRolAdmin } = require('./middlewares');


// ============================
// ======== ROUTING ===========
// ============================
const usuariosRoutes = require('./routes/usuariosRoutes');
server.use('/usuarios', usuariosRoutes);
//================================================
// LOGIN
const authRoutes = require('./routes/authRoutes');
server.use('/auth', authRoutes);


// ================================================================================================
// =========================================== REGION/CIUDAD (CRUD) ADMINS ONLY ===================

// FALTAN VALIDACIONES !! 

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
server.get('/paises/:paisId', validarRolAdmin, async (req, res) => {
  try {
    const paisOk = await Paises.findOne({
      where: {
        id: req.params.paisId
      }
    }) 
    res.status(200).json(paisOk);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

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
    res.status(200).json({ message: `Operación exitosa. El país con id ${req.params.paisId} ha sido eliminado`});
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

// =============================
// ====== CRUD CIUDADES ========
// create


// read
server.get('/ciudades', validarRolAdmin, async (req, res) => {
  try {
    const ciudadesOk = await Ciudades.findAll();
    res.status(200).json(ciudadesOk);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});
// read by id
server.get('/ciudades/:ciudadId', validarRolAdmin, async (req, res) => {
  try {
    const ciudadOk = await Ciudades.findOne({
      where: {
        id: req.params.ciudadId
      }
    }) 
    res.status(200).json(ciudadOk);
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

// update
server.put('/ciudades/:ciudadId', validarRolAdmin, (req,res) => {
  // update nombre
  if (req.body.nombre) {
    Ciudades.update(
      { nombre: req.body.nombre},
      {
        where: {
          id: req.params.ciudadId
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
server.delete('/ciudades/borrar/:ciudadId', validarRolAdmin, async (req, res) => {
  try {
    await Ciudades.destroy({
      where: {
        id: req.params.ciudadId
      }
    })
    res.status(200).json({ message: `Operación exitosa. La ciudad con id ${req.params.ciudadId} ha sido eliminada`});
  } catch (error) {
    res.status(400).json({ error: error.message});
  }
});

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