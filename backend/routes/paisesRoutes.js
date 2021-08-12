const router = require('express').Router();
const {
    postPais,
    getPaises,
    getPaisPorId,
    putPaisPorId,
    deletePaisPorId
} = require('../controllers/paisesController');
const { validarRolAdmin, validarBodyPais } = require('../middlewares');

// =============================
// ====== CRUD PAISES ==========
// create
router.post('/', validarRolAdmin, validarBodyPais, postPais);
// read
router.get('/', validarRolAdmin, getPaises);
// read by id
router.get('/:paisId', validarRolAdmin, getPaisPorId);
// update
router.put('/:paisId', validarRolAdmin, putPaisPorId);
// delete
router.delete('/borrar/:paisId', validarRolAdmin, deletePaisPorId);

module.exports = router;