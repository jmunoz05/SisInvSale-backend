const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/VentaController');

router.get('/', ventaController.obtenerVentas);
router.post('/', ventaController.crearVenta);
router.put('/reversar/:id', ventaController.reversarVenta);
  
module.exports = router;