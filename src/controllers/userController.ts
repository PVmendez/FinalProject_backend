import User from '../models/userModel';

// Handler for GET request
const getUser = (req, res) => {
  const userId = req.params.id; // Get the user ID from the request parameters

  // Search the user by their ID in the database
  User.findById(userId, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error getting user from database' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // User found, send it in reply
    res.json(user);
  });
};

module.exports = getUser;
