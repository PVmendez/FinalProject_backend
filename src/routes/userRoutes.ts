import express from "express";
import userController from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/users", userController.getUsers);

export default userRouter;
