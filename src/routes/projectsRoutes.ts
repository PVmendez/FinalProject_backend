import express from "express";
import projectsController from "../controllers/projectsControllers";

const projectsRouter = express.Router();

projectsRouter.get("/projects", projectsController.getProjects);

export default projectsRouter;
