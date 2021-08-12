const { Regiones } = require('../models/relations');

const postRegion = async (req, res) => {
    try {
      const nuevaRegion = await Regiones.create({
        nombre: req.body.nombre
      });
      res.status(200).json({ nuevaRegion });
    } catch (error) {
      res.send({ error: error.message });
    }
};

const getRegiones = async (req, res) => {
    try {
      const regionesOk = await Regiones.findAll();
      res.status(200).json(regionesOk);
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
};

const getRegionPorId = async (req, res) => {
    try {
      const regionOk = await Regiones.findOne({
        where: {
          id: req.params.regionId
        }
      });
      res.status(200).json(regionOk);
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
};

const putRegionPorId = async (req,res) => {
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
}

const deleteRegionPorId = async (req, res) => {
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
}

module.exports = {
    postRegion,
    getRegiones,
    getRegionPorId,
    putRegionPorId,
    deleteRegionPorId
}