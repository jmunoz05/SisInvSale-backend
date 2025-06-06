const Venta = require('../models/Venta');
const Producto = require('../models/Producto');

exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate('cliente')
      .populate('productos.producto');
    res.json(ventas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.crearVenta = async (req, res) => {
  try {
    const { cliente, productos } = req.body;

    let total = 0;
    for (const item of productos) {
      const prod = await Producto.findById(item.producto);
      if (!prod || prod.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para ${prod?.nombre || 'producto'}` });
      }
      total += prod.precio * item.cantidad;
      prod.stock -= item.cantidad;
      await prod.save();
    }

    const nuevaVenta = new Venta({ cliente, productos, total });
    await nuevaVenta.save();
    res.json(nuevaVenta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.reversarVenta = async (req, res) => {
    try {
      const venta = await Venta.findById(req.params.id).populate('productos.producto');
      
      if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
      if (venta.reversada) return res.status(400).json({ error: 'Esta venta ya ha sido reversada' });
  
      // Devolver stock de productos
      for (const item of venta.productos) {
        await Producto.findByIdAndUpdate(item.producto._id, {
          $inc: { stock: item.cantidad }  // Devolvemos el stock de cada producto
        });
      }
  
      // Marcar la venta como reversada
      venta.reversada = true;
      await venta.save();
  
      res.json({ success: true, message: 'Venta reversada correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error al reversar la venta' });
    }
  }
