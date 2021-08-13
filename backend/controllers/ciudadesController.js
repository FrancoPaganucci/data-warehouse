const { Ciudades } = require('../models/relations');

const postCiudad = async (req, res) => {
    try {
      const nuevaCiudad = await Ciudades.create({
        nombre: req.body.nombre,
        pais_id: req.body.pais_id
      });
      res.status(200).json({ nuevaCiudad });
    } catch (error) {
      res.send({ error: error.message });
    }
};

const getCiudades = async (req, res) => {
    try {
      const ciudadesOk = await Ciudades.findAll();
      res.status(200).json(ciudadesOk);
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
};

const getCiudadPorId = async (req, res) => {
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
};

const putCiudadPorId = (req,res) => {
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
};

const deleteCiudadPorId = async (req, res) => {
    try {
        const ciudadBorrable = await Ciudades.findOne({
            where: {
                id: req.params.ciudadId
            }
        })
        if (!ciudadBorrable) {
            res.status(400).json({ error: `Id ${req.params.ciudadId} not found.` });
        } else {
            await Ciudades.destroy({
                where: {
                    id: req.params.ciudadId
                }
            })
            res.status(200).json({ message: `Operación exitosa. La ciudad con id ${req.params.ciudadId} ha sido eliminada.` });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    postCiudad,
    getCiudades,
    getCiudadPorId,
    putCiudadPorId,
    deleteCiudadPorId
};