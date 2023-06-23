import mongoose from 'mongoose';

// Define the user schema
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

// Create "User" model
const User = mongoose.model('Users', userSchema, 'UserList');

export default User;
