import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20
  },
  email: {
    type: String,
    validate: {
      validator: async function (email: string) {
        const car = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return car.test(email);
      },
    },
    required: true,
    unique: true,
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
const User = mongoose.model('User', userSchema, 'UserList');

export default User;
