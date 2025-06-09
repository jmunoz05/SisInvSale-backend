const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verificarToken = require('./middleware/authMiddleware');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.send('API Inventario funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const authRoutes = require('./routers/AuthRoutes');
const productoRoutes = require('./routers/ProductoRoutes');
const clienteRoutes = require('./routers/ClienteRoutes');
const ventaRoutes = require('./routers/VentaRoutes');
// Rutas de la API
app.use('/auth', authRoutes);
app.use('/api/productos', verificarToken, productoRoutes);
app.use('/api/clientes', verificarToken, clienteRoutes);
app.use('/api/ventas', verificarToken, ventaRoutes);