import express from "express";
import User from "../models/userModel";
const userRouter = express.Router();

userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users)
    res.json(users);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error getting the projects" });
  }
});

export default userRouter;
