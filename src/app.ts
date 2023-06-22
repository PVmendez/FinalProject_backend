import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
import userRouter from "./routes/userRoutes";

app.use("/", userRouter);

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
