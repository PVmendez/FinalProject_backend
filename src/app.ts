import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient, ServerApiVersion } from "mongodb";
require("dotenv").config();

const PORT = 3000;
const app = express();
import userRouter from "./routes/userRoutes";
const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const uri = `mongodb+srv://${dbUser}:${dbPassword}@secradardb.f9xsna0.mongodb.net/?retryWrites=true&w=majority`;
app.use("/", userRouter);

//Database Connection
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Ping works, connection to MongoDB successful");
  } finally {
    // Force client to close when finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Paths
app.get("/", (req, res) => {
  res.send("¡Is running!");
});

// Port
app.listen(PORT, () => {
  console.log(`Listen at port ${PORT}`);
});
