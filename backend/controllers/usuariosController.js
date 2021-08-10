const {Usuarios} = require('../models/relations');

const postUsuario = async (req, res) => {
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
};

const getUsuarios = async (req, res) => {
    try {
        const UsuariosOk = await Usuarios.findAll();
        res.status(200).json(UsuariosOk);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUsuarioPorId = async (req, res) => {
    try {
        const usuarioOk = await Usuarios.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(usuarioOk);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUsuarioPorId = async (req,res) => {
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
  };

const deleteUsuarioPorId =  async (req, res) => {
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
  };

module.exports = {
    getUsuarios,
    getUsuarioPorId,
    postUsuario,
    updateUsuarioPorId,
    deleteUsuarioPorId
}