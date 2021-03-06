const { Paises } = require('../models/relations');

const postPais = async (req, res) => {
    // Encontrar el id para agregarlo en la foreign key, se manda desde el front
    try {
      const nuevoPais = await Paises.create({
        nombre: req.body.nombre,
        region_id: req.body.region_id
      });
      res.status(200).json({ nuevoPais });
    } catch (error) {
      res.send({ error: error.message });
    }
};

const getPaises = async (req, res) => {
    try {
      const paisesOk = await Paises.findAll();
      res.status(200).json(paisesOk);
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
};

const getPaisPorId = async (req, res) => {
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
};

const getPaisPorRegionId = async (req, res) => {
  try {
    const PaisesOk = await Paises.findAll({
      where: {
        region_id: req.params.regionId
      }
    })
    res.status(200).json(PaisesOk);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const putPaisPorId = (req,res) => {
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
}

const deletePaisPorId = async (req, res) => {
    try {
      const paisBorrable = await Paises.findOne({
        where: {
          id: req.params.paisId
        }
      })
      if (!paisBorrable) {
        res.status(400).json({error: `Id ${req.params.paisId} not found.`});
      } else {
        await Paises.destroy({
          where: {
            id: req.params.paisId
          }
        })
        res.status(200).json({ message: `Operaci??n exitosa. El pa??s con id ${req.params.paisId} ha sido eliminado`});
      }
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
};

module.exports = {
    postPais,
    getPaises,
    getPaisPorId,
    getPaisPorRegionId,
    putPaisPorId,
    deletePaisPorId
}