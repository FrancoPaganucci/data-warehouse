const router = require('express').Router();
const {validarBodyLogin, verificarLogin} = require('../middlewares');
const { login } = require('../controllers/authController')
// post login
router.post('/login', validarBodyLogin, verificarLogin, login);

module.exports = router;