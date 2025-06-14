const Producto = require('../models/Producto');

exports.obtenerProductos = async (req, res) => {
  try {

    const productos = await Producto.aggregate([
    {
      $project: {
        id: { $toString: '$_id' },
        nombre: 1,
        precio: 1,
        stock: 1,
        _id: 0
      }
    }
  ]);

    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crearProducto = async (req, res) => {
  try {
    const response = await new Producto(req.body).save();
    res.json({success: true, id: response._id});
  } catch (err) {
    res.status(400).json({ success:false, error: err.message });
  }
};

exports.actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    const response = await Producto.findByIdAndDelete(req.params.id);
    res.json({ success: true, id: response._id });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
