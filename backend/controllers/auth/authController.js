const db = require('../../config/db'); // Ojo: usa ../../ porque subes dos carpetas

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2 AND status = $3',
      [username, password, 'activo']
    );

    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.json({ success: false, message: 'Usuario no encontrado o inactivo' });
    }
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};
