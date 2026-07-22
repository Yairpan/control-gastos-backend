const express = require('express');
const router = express.Router();
const gastoController = require('../controllers/gasto.controller');
const {verificarToken, permitirRoles} = require('../middlewares/auth.middlewares');



router.post('/crear', verificarToken, permitirRoles(['USER', 'ADMIN']), gastoController.crearGastos);
router.get('/obtener', verificarToken, permitirRoles(['USER', 'ADMIN']) ,gastoController.obtenerGastos);
router.delete('/eliminar', verificarToken, permitirRoles(['USER', 'ADMIN']), gastoController.eliminarGastos);
router.put('/actualizar', verificarToken, permitirRoles(['USER', 'ADMIN']), gastoController.actualizarGastos);


module.exports = router;
