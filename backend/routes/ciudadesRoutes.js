const router = require('express').Router();
const {
    postCiudad,
    getCiudades,
    getCiudadPorId,
    getCiudadPorPaisId,
    putCiudadPorId,
    deleteCiudadPorId
} = require('../controllers/ciudadesController');
const { validarRolAdmin } = require('../middlewares'); // Faltaría validación POST body

// =============================
// ====== CRUD CIUDADES ========
// create
router.post('/', validarRolAdmin, postCiudad);
// read
router.get('/', validarRolAdmin, getCiudades);
// read by id
router.get('/:ciudadId', validarRolAdmin, getCiudadPorId);
// read by pais id
router.get('/porPais/:paisId', getCiudadPorPaisId);
// update
router.put('/:ciudadId', validarRolAdmin, putCiudadPorId);
// delete
router.delete('/borrar/:ciudadId', validarRolAdmin, deleteCiudadPorId);

module.exports = router;