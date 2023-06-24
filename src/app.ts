import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./routes/indexRoutes"
import dbInitialSetup from "../dbIntialSetup";

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

// Port
app.listen(PORT, () => {
  console.log(`Listen at port ${PORT}`);
}); 
