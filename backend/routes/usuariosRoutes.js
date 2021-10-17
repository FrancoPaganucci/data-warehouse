const router = require('express').Router();
const {
    getUsuarios,
    getUsuarioPorId,
    postUsuario,
    updateUsuarioPorId,
    deleteUsuarioPorId
} = require('../controllers/usuariosController');
const { validarRolAdmin, validarBodyNuevoUsuario, validarUsuarioEmail, validarPasswordRepeat} = require('../middlewares');
// ================================================================================================
// =========================================== USUARIOS (CRUD) ADMINS ONLY ========================
// Create usuario (ver en la guía qué campos pide el frontend)
router.post('/', validarRolAdmin, validarBodyNuevoUsuario, validarPasswordRepeat, validarUsuarioEmail, postUsuario);
// Read usuarios
router.get('/', validarRolAdmin, getUsuarios);
// Read usuario x id
router.get('/:id', validarRolAdmin, getUsuarioPorId);
// Update usuario
router.put('/:usuarioId', validarRolAdmin, updateUsuarioPorId);
// Delete usuario
// Agregar ventana emergente de confirmación en el front
router.delete('/borrar/:usuarioId', validarRolAdmin, deleteUsuarioPorId);

module.exports = router;