const router = require('express').Router();
const {
    postCompania,
    getCompanias,
    getCompaniaPorId,
    putCompaniaPorId,
    deleteCompaniaPorId
} = require('../controllers/companiasController');
const { validarRolAdmin, validarBodyCompania} = require('../middlewares');

// ================================================================================================
// =========================================== COMPANIAS (CRUD) ADMINS ONLY =======================
// create
router.post('/', validarRolAdmin, validarBodyCompania, postCompania);
// read
router.get('/', validarRolAdmin, getCompanias);
// read by id
router.get('/:companiaId', validarRolAdmin, getCompaniaPorId);
// update
router.put('/:companiaId', validarRolAdmin, putCompaniaPorId);
// delete
router.get('/borrar/:companiaId', validarRolAdmin, deleteCompaniaPorId);

module.exports = router;