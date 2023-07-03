import express from "express";
import userController from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const userRouter = express.Router();



userRouter.get("/users", userController.getUsers);
userRouter.post('/login', userController.loginUser);
userRouter.post('/register', userController.registerUser);
userRouter.get('/user', verifyToken, userController.getUserByEmail);
userRouter.patch('/update', verifyToken, userController.updateUser);

export default userRouter;
