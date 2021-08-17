const router = require('express').Router();
const {
    postContacto,
    getContactos,
    getContactoPorId,
    putContactoPorId,
    deleteContactoPorId
} = require('../controllers/contactosController');
const { validarBodyContacto } = require('../middlewares');

// ================================================================================================
// =========================================== CONTACTOS (CRUD) ===================================
// create
router.post('/', validarBodyContacto, postContacto);
// read
router.get('/', getContactos);
// read x id
router.get('/:contactoId', getContactoPorId);
// update
router.put('/:contactoId', putContactoPorId);
// delete
router.delete('/borrar/:contactoId', deleteContactoPorId);

module.exports = router;