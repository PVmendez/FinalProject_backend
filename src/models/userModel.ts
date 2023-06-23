import mongoose from 'mongoose';

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  full_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
});

// Crear el modelo "User"
const User = mongoose.model('User', userSchema);

export default User;
