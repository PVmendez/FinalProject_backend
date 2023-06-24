import express from "express";
import engineController from "../controllers/engineController";

const engineRouter = express.Router();

engineRouter.get("/engines", engineController.getEngines);

export default engineRouter;
