import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

import Routes from "./routes/indexRoutes"
import dbInitialSetup from "../dbIntialSetup";
import { getUserByEmail } from "./users";
import  User from "./models/userModel";

require("dotenv").config();

const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@secradardb.f9xsna0.mongodb.net/?retryWrites=true&w=majority`;
const PORT = 3000;
const app = express();

// Middlewares 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database Connection
dbInitialSetup(uri);

//Paths
Routes(app);

// Paths
app.get('/', async (req, res) => {
  res.send('¡Is running!');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email)
  
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
});

app.post('/register', async(req, res) => {
  const { username, email, full_name, password } = req.body;

  try {
    const user = await getUserByEmail(email);

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
});

// Port
app.listen(PORT, () => {
  console.log(`Listen at port ${PORT}`);
}); 
