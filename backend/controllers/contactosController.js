const { Contactos } = require('../models/relations');

const postContacto = async (req, res) => {
    try {
        const nuevoContacto = await Contactos.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            cargo: req.body.cargo,
            compania_id: req.body.compania_id
        });
        res.status(200).json(nuevoContacto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getContactos = async (req, res) => {
    try {
        const contactosOk = await Contactos.findAll();
        res.status(200).json(contactosOk);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getContactoPorId = async (req, res) => {
    try {
        const contactoOk = await Contactos.findOne({
            where: {
                id: req.params.contactoId
            }
        });
        res.status(200).json(contactoOk);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const putContactoPorId = async (req, res) => {
    // if nombre
    if (req.body.nombre) {
        try {
            const nombreUpdate = await Contactos.update(
                { nombre: req.body.nombre },
                {
                    where: {
                        id: req.params.contactoId
                    }
                });
            res.status(200).json(nombreUpdate);
        } catch (error) {
            res.status(400).json({ error: "Campo a actualizar inexistente" });
        }
    }
    // if apellido
    if (req.body.apellido) {
        try {
            const apellidoUpdate = await Contactos.update(
                { apellido: req.body.apellido },
                {
                    where: {
                        id: req.params.contactoId
                    }
                });
            res.status(200).json(apellidoUpdate);

        } catch (error) {
            res.status(400).json({ error: "Campo a actualizar inexistente" });
        }
    }
    // if email
    if (req.body.email) {
        try {
            const emailUpdate = await Contactos.update(
                { email: req.body.email },
                {
                    where: {
                        id: req.params.contactoId
                    }
                });
            res.status(200).json(emailUpdate);
        } catch (error) {
            res.status(400).json({ error: "Campo a actualizar inexistente" });
        }
    }
    // if cargo
    if (req.body.cargo) {
        try {
            const cargoUpdate = await Contactos.update(
                { cargo: req.body.cargo },
                {
                    where: {
                        id: req.params.contactoId
                    }
                });
            res.status(200).json(cargoUpdate);
        } catch (error) {
            res.status(400).json({ error: "Campo a actualizar inexistente" });
        }
    }
    // if compania_id
    if (req.body.compania_id) {
        try {
            const companiaIdUpdate = await Contactos.update(
                { compania_id: req.body.compania_id },
                {
                    where: {
                        id: req.params.contactoId
                    }
                });
            res.status(200).json(companiaIdUpdate);
        } catch (error) {
            res.status(400).json({ error: "Campo a actualizar inexistente" });
        }
    }
    // si el campo no existe
    else {
        res.status(400).json({ message: "campo a actualizar inexistente" });
    };
};

const deleteContactoPorId = async (req, res) => {
    try {
        const contactoBorrable = await Contactos.findOne({
            where: {
                id: req.params.contactoId
            }
        })
        if (!contactoBorrable) {
            res.status(400).json({ error: `Id ${req.params.contactoId} not found.` });
        } else {
            await Contactos.destroy({
                where: {
                    id: req.params.contactoId
                }
            })
            res.status(200).json({ message: `Operación exitosa. El contacto con id ${req.params.contactoId} ha sido eliminado.` });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    postContacto,
    getContactos,
    getContactoPorId,
    putContactoPorId,
    deleteContactoPorId
}