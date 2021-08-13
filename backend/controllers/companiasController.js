const { Companias } = require('../models/relations');

const postCompania = async (req, res) => {
    try {
      const nuevaCompania = await Companias.create({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono: req.body.telefono,
        ciudad_id: req.body.ciudad_id
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
    try {
      // if nombre
      if(req.params.nombre){
        Companias.update(
          { nombre: req.body.nombre},
          {
            where: {
              id: req.params.companiaId
            }
          }
        ).then(update => {
          res.status(200).json({update});
        }).catch(error => {
          res.status(400).json({ error: error.message })
        });
      }
      // if direccion
      if(req.params.direccion){
        Companias.update(
          { direccion: req.body.direccion},
          {
            where: {
              id: req.params.companiaId
            }
          }
        ).then(update => {
          res.status(200).json({update});
        }).catch(error => {
          res.status(400).json({ error: error.message })
        });
      }
      // if email
      if(req.params.email){
        Companias.update(
          { email: req.body.email},
          {
            where: {
              id: req.params.companiaId
            }
          }
        ).then(update => {
          res.status(200).json({update});
        }).catch(error => {
          res.status(400).json({ error: error.message })
        });
      }
      // if telefono
      if(req.params.telefono){
        Companias.update(
          { telefono: req.body.telefono},
          {
            where: {
              id: req.params.companiaId
            }
          }
        ).then(update => {
          res.status(200).json({update});
        }).catch(error => {
          res.status(400).json({ error: error.message })
        });
      }
      // if ciudad_id
      if(req.params.ciudad_id){
        Companias.update(
          { ciudad_id: req.body.ciudad_id},
          {
            where: {
              id: req.params.companiaId
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
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
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