const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const verificarToken = require('../middlewares/auth.middlewares');
const {body} = require('express-validator');


router.post('/Registrar', verificarToken, [body(nombre).escape(), body(contraseña).escape(), body(email).escape().isEmail(), body(edad)],usuarioController.crearUsuario);
router.post('/login', verificarToken, [body(nombre).escape(), body(contraseña).escape()], usuarioController.iniciarUsuario);


module.exports = router;



























































