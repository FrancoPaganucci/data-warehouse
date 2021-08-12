const router = require('express').Router();
const { 
    postRegion, 
    getRegiones, 
    getRegionPorId,
    putRegionPorId, 
    deleteRegionPorId 
} = require('../controllers/regionesController');
const { validarBodyRegion, validarRolAdmin } = require('../middlewares')

// =============================
// ====== CRUD REGIONES ========
// create
router.post('/', validarRolAdmin, validarBodyRegion, postRegion);
// read
router.get('/', validarRolAdmin, getRegiones);
// read by id
router.get('/:regionId', validarRolAdmin, getRegionPorId);
// update
router.put('/:regionId', validarRolAdmin, putRegionPorId);
// delete
router.delete('/borrar/:regionId', validarRolAdmin, deleteRegionPorId);

module.exports = router;