import express from "express";
import projectsController from "../controllers/projectsControllers";

const projectsRouter = express.Router();

projectsRouter.get("/projects", projectsController.getProjects);
projectsRouter.get("/engines", projectsController.getEngines);

export default projectsRouter;