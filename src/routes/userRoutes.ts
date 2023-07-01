import express from "express";
import userController from "../controllers/userController";
const userRouter = express.Router();

userRouter.get("/users", userController.getUsers);
userRouter.post('/login', userController.loginUser);
userRouter.post('/register', userController.registerUser);
userRouter.get('/user', userController.getUserByEmail);
userRouter.post('/reset', userController.resetPassword);


export default userRouter;
