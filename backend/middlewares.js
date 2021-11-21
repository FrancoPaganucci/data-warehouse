// instanciar modelos
const { Ciudades, Companias, Contactos, Paises, Regiones, Usuarios } = require('./models/relations');
// VALIDACIONES
//==============================================================================================
//==============================================================================================
// validación ADMIN
const validarRolAdmin = async (req, res, next) => {
    try {
      const usuario = await Usuarios.findOne({
        where: {
          email: req.user.email
        }
      });
  
      if (usuario.perfil === 'basico') {
        res.status(400).json({ error: "Acceso denegado. Solo para administradores" });
      } else {
        next();
      }
      
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  };
//==============================================================================================
//==============================================================================================
// validaciones LOGIN
const validarBodyLogin = (req, res, next) => {
    if (
        !req.body.email ||
        !req.body.password
    ) {
        res.status(400).json({
            error: "debe registrarse con los datos completos",
        });
    } else {
        next();
    }
  };

const verificarLogin = async (req, res, next) => {
    try {
      const loginOk = await Usuarios.findOne({
        where: {
          email: req.body.email,
          password: req.body.password
        }
      });
  
      if (!loginOk) {
        /*res.status(400).json({
          error: "Credenciales incorrectas"
        })*/
        res.send("<html> <head>server Response</head><body><h1> Error <p>credenciales incorrectas</p></h1></body></html>");
      } else {
        next();
      }
  
    } catch (error) {
      res.send({ error: error.message });
    }
  };
//==============================================================================================
//==============================================================================================
// validaciones USUARIOS
const validarBodyNuevoUsuario = (req, res, next) => {
  if (
    !req.body.nombre ||
    !req.body.apellido ||
    !req.body.email ||
    !req.body.perfil ||
    !req.body.password ||
    !req.body.passwordRepeat
  ) {
    alert("debe registrarse con los datos completos")
    res.status(400).json({
      error: "debe registrarse con los datos completos",
    });

  } else {
    next();
  }
};

const validarPasswordRepeat = (req, res, next) => {
  if (req.body.password !== req.body.passwordRepeat) {
    alert("Los campos 'Contraseña' y 'Repetir contraseña' no coinciden.");

    res.status(400).json( {
      error: "Los campos 'Contraseña' y 'Repetir contraseña' no coinciden."
    })
  } else {
    next();
  }
}

const validarUsuarioEmail = async (req, res, next) => {
  try {
    const usuarioExistente = await Usuarios.findOne({
      where: {
        email: req.body.email
      }
    });
    if (usuarioExistente) {
      res.status(409).json({ error: `Ya existe una cuenta registrada con la dirección ${req.body.email}` });
    } else {
      next();
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};
//==============================================================================================
//==============================================================================================
// validaciones REGIONES
const validarBodyRegion = (req, res, next) => {
  if (
      !req.body.nombre
  ) {
      res.status(400).json({
          error: "debe ingresar el nombre de la región",
      });
  } else {
      next();
  }
};
// Validaciones PAISES
const validarBodyPais = (req, res, next) => {
  if (
    !req.body.nombre
  ) {
    res.status(400).json({
      error: "debe ingresar el nombre del país",
    });
  } else {
    next();
  }
};
//==============================================================================================
//==============================================================================================
// validaciones COMPAÑÍAS
const validarBodyCompania = (req, res, next) => {
  if (
      !req.body.nombre ||
      !req.body.direccion ||
      !req.body.email ||
      !req.body.telefono ||
      !req.body.nombre_ciudad
  ) {
      res.status(400).json({
          error: "datos incompletos, se requiere: nombre | direccion | email | telefono | nombre_ciudad",
      });
  } else {
      next();
  }
};
//==============================================================================================
//==============================================================================================
// validaciones CONTACTOS
const validarBodyContacto = (req, res, next) => {
  if (
      !req.body.nombre ||
      !req.body.apellido ||
      !req.body.email ||
      !req.body.cargo ||
      !req.body.compania_id
  ) {
      res.status(400).json({
          error: "datos incompletos, se requiere: nombre | apellido | email | cargo | compania_id",
      });
  } else {
      next();
  }
};

module.exports = { validarRolAdmin, validarBodyLogin, verificarLogin, validarBodyNuevoUsuario, validarUsuarioEmail, validarBodyRegion, validarBodyPais, validarBodyCompania, validarBodyContacto, validarPasswordRepeat };