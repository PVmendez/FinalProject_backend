import User from "../models/userModel";
import jwt from "jsonwebtoken";

const userController = {
  getUsers: async (req: any, res: any) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error getting the projects" });
    }
  },
  getUserByEmail: async (req: any, res: any, email: String) => {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: 'Error getting the users' });
    }
  },
  loginUser: async (req: any, res: any) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email: email });
    
    if (user) {
      if(user.password == password) {
        const jwtBearerToken = jwt.sign({ email }, process.env.SECRET_KEY!, {
          algorithm: 'HS256',
          expiresIn: '24h'
        });
      
        res.status(201).json({ token: jwtBearerToken })
      } else {
        res.status(401).json({ message: 'Unauthorized' }); 
      }
    } else {
      return res.status(404).json({ message: 'User Not Found' });
    }
  },
  registerUser: async(req: any, res: any) => {
    const { username, email, full_name, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
  
      if(user) { return res.status(409).send("User with this email already exists") }
  
      const newUser = new User({
        email: email,
        password: password,
        username: username,
        full_name: full_name
      })
  
      await newUser.save();
  
      res.status(201).send('User created succesfully');
    } catch {
      res.status(500).send('Error trying to create user');
    }
  }
};



export default userController;
