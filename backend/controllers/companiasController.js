const { Companias, Ciudades } = require('../models/relations');

const postCompania = async (req, res) => {
    try {
      const ciudad_id = await Ciudades.findOne({
        where: {
          nombre: req.body.nombre_ciudad
        }
      })
      const nuevaCompania = await Companias.create({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono: req.body.telefono,
        ciudad_id: ciudad_id.id
      });
      res.status(200).json(nuevaCompania);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }

};

const getCompanias = async (req, res) => {
    try {
      const companiasOk = await Companias.findAll();
      res.status(200).json(companiasOk);
    } catch (error) {
      res.status(400).json({ error: error.message} );
    }
};

const getCompaniaPorId = async (req, res) => {
    try {
      const companiaOk = await Companias.findOne({
        where: {
          id: req.params.companiaId
        }
      });
      res.status(200).json(companiaOk);
    } catch (error) {
      res.status(400).json({ error: error.message} );
    }
};

const putCompaniaPorId = async (req, res) => {
  // if nombre
  if (req.body.nombre) {
    try {
      const nombreUpdate = await Companias.update(
        { nombre: req.body.nombre },
        {
          where: {
            id: req.params.companiaId
          }
        });
      res.status(200).json(nombreUpdate);
    } catch (error) {
      res.status(400).json({ error: "Campo a actualizar inexistente" });
    }
  }
  // if direccion
  if (req.body.direccion) {
    try {
      const direccionUpdate = await Companias.update(
        { direccion: req.body.direccion },
        {
          where: {
            id: req.params.companiaId
          }
        });
      res.status(200).json(direccionUpdate);

    } catch (error) {
      res.status(400).json({ error: "Campo a actualizar inexistente" });
    }
  }
  // if email
  if (req.body.email) {
    try {
      const emailUpdate = await Companias.update(
        { email: req.body.email },
        {
          where: {
            id: req.params.companiaId
          }
        });
      res.status(200).json(emailUpdate);
    } catch (error) {
      res.status(400).json({ error: "Campo a actualizar inexistente" });
    }
  }
  // if telefono
  if (req.body.telefono) {
    try {
      const telefonoUpdate = await Companias.update(
        { telefono: req.body.telefono },
        {
          where: {
            id: req.params.companiaId
          }
        });
      res.status(200).json(telefonoUpdate);
    } catch (error) {
      res.status(400).json({ error: "Campo a actualizar inexistente" });
    }
  }
  // if ciudad_id
  if (req.body.ciudad_id) {
    try {
      const ciudadIdUpdate = await Companias.update(
        { ciudad_id: req.body.ciudad_id },
        {
          where: {
            id: req.params.companiaId
          }
        });
      res.status(200).json(ciudadIdUpdate);
    } catch (error) {
      res.status(400).json({ error: "Campo a actualizar inexistente" });
    }
  }
  // si el campo no existe
  else {
    res.status(400).json({ message: "campo a actualizar inexistente" });
  };
};

const deleteCompaniaPorId = async (req, res) => {
    try {
      const companiaBorrable = await Companias.findOne({
        where: {
            id: req.params.companiaId
        }
    })
    if (!companiaBorrable) {
        res.status(400).json({ error: `Id ${req.params.companiaId} not found.` });
    } else {
        await Companias.destroy({
            where: {
                id: req.params.companiaId
            }
        })
        res.status(200).json({ message: `Operación exitosa. La compañía con id ${req.params.companiaId} ha sido eliminada.` });
    }
    } catch (error) {
      res.status(400).json({ error: error.message} );
    }
};

module.exports = {
    postCompania,
    getCompanias,
    getCompaniaPorId,
    putCompaniaPorId,
    deleteCompaniaPorId
}