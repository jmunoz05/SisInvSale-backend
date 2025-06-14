// models/Venta.js
const mongoose = require('mongoose');

const ventaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'cliente' },
  productos: [{
    producto: { type: mongoose.Schema.Types.ObjectId, ref: 'producto' },
    cantidad: Number,
  }],
  fecha: { type: Date, default: Date.now },
  reversada: { type: Boolean, default: false }, 
});

const Venta = mongoose.model('venta', ventaSchema);
module.exports = Venta;
