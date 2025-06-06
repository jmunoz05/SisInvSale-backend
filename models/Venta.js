// models/Venta.js
const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: Number,
  }],
  fecha: { type: Date, default: Date.now },
  reversada: { type: Boolean, default: false },  // Campo para marcar si la venta fue reversada
});

const Venta = mongoose.model('Venta', ventaSchema);
module.exports = Venta;
