import User from '../models/userModel'; // Importar el modelo de usuario

// Controlador para la solicitud GET
const getUser = (req, res) => {
  const userId = req.params.id; // Obtener el ID del usuario desde los parámetros de la solicitud

  // Buscar el usuario por su ID en la base de datos
  User.findById(userId, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener el usuario de la base de datos' });
    }

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Usuario encontrado, enviarlo en la respuesta
    res.json(user);
  });
};

module.exports = getUser;
