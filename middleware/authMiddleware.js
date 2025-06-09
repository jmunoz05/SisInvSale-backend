const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  
    const token = req.headers['authorization'];
  
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.usuarioId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = verificarToken;
