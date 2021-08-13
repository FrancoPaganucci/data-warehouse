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
server.post('/', validarRolAdmin, validarBodyCompania, postCompania);
// read
server.get('/', validarRolAdmin, getCompanias);
// read by id
server.get('/:companiaId', validarRolAdmin, getCompaniaPorId);
// update
server.put('/:companiaId', validarRolAdmin, putCompaniaPorId);
// delete
server.get('/borrar/:companiaId', validarRolAdmin, deleteCompaniaPorId);

module.exports = router;